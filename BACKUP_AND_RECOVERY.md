# LR Techno Park Enterprise B2B Platform — Backup, Recovery & Storage Architecture

## 1. Storage Overview & Scope
The LR Techno Park Enterprise Platform persists stateful transactional entities to a file-backed atomic database store with automatic snapshotting and continuous backup rotation.

### Managed Entities:
1. **Registered Customer & Staff Profiles**: PBKDF2-HMAC-SHA512 hashed credentials, role assignments, GSTINs, and corporate metadata.
2. **B2B Hardware Orders**: Server-authoritative line items, pricing, 18% GST tax breakdowns, HSN codes, and status timelines.
3. **Enterprise Service Bookings**: Site assessment requests, deployment schedules, SLA requirements.
4. **Inbound Contact Enquiries**: Solution architecture inquiries, RFP submissions, budget bands.
5. **Support Tickets**: NOC engineering requests, priority queues, and diagnostic notes.
6. **Sequence Counters**: Monotonically increasing sequence generators for Order IDs, Booking IDs, and Enquiry IDs.

---

## 2. Backup & Snapshot Strategy

### Storage Locations
* **Primary Transactional Store**: `data/store.json` (Atomic POSIX writes via `.tmp` swap).
* **High-Availability Secondary Mirror**: `data/store.backup.json` (Real-time replica updated on every commit).
* **Timestamped Rolling Snapshots**: `data/backups/store-*.json` (Maintains the 5 most recent snapshots with SHA-256 integrity checksums).

### Backup Frequency & Automation
* **On-Write Snapshots**: Every transaction (Order creation, Status update, User registration, Booking) performs an atomic write and synchronizes the primary mirror.
* **Rolling Rotation**: Pre-write snapshots are archived to `data/backups/` with ISO timestamps, pruning stale snapshots beyond the retention threshold (5 copies).
* **Integrity Auditing**: Checksums are computed and compared during runtime startup.

---

## 3. Disaster Recovery & Self-Healing Workflow

### Automated Corrupted Store Recovery:
1. **Validation on Boot**: The server parses `data/store.json`.
2. **Fallback Level 1 (Mirror)**: If JSON parse fails or file is zero-length, the runtime automatically checks `data/store.backup.json`.
3. **Fallback Level 2 (Historical Snapshot)**: If the mirror is unavailable, the runtime scans `data/backups/` for the latest valid JSON snapshot.
4. **Fallback Level 3 (Seed Baseline)**: If all disk stores are irrecoverable, it initializes with hardened cryptographic seed records and logs an audit alert.

### Manual Restoration Procedure
To restore from a specific snapshot:
```bash
# 1. Stop the application server
npm run stop # or container stop

# 2. Copy the desired backup snapshot over the primary store
cp data/backups/store-2026-08-24T00-00-00.json data/store.json

# 3. Verify file permissions
chmod 600 data/store.json

# 4. Restart the server
npm start
```

---

## 4. Production Database Migration Roadmap (PostgreSQL / Cloud SQL)

For large-scale enterprise deployments exceeding 50,000 monthly orders or requiring multi-region active-active replication:

1. **Relational Schema Mapping**:
   * `users` → `auth.users` with UUID primary keys and role enum.
   * `orders` & `order_items` → Normalized 1:N relational tables with foreign keys and HSN/SAC indices.
   * `service_bookings` & `contact_enquiries` → Partitioned audit tables.
2. **Migration Tooling**:
   * A migration script (`scripts/migrate-json-to-pg.ts`) reads `data/store.json` and inserts records within a single SQL transaction.
3. **Access Control**:
   * Private VPC peering, IAM database authentication, and TLS 1.3 encrypted connections.

---

## 5. Security & Access Control
* **HTTP Exposure**: Direct HTTP access to the `/data` directory is strictly blocked at the Express middleware layer with `403 Forbidden`.
* **File Permissions**: Files in `data/` are restricted to the application runtime user (`0600` for files, `0700` for directories).
* **Secrets Separation**: Cryptographic HMAC secrets and signing keys reside exclusively in server environment variables and are never stored in `data/store.json`.
