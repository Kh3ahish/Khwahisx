# Security Specification for KK7 Portfolio

## Data Invariants
- A `ContactMessage` must have a valid `name`, `email`, `message`, and `status`.
- `createdAt` must be set to the server time.
- Only admins can read or delete contact messages.
- Anyone can create a contact message.
- Admins are defined in the `/admins` collection.

## The "Dirty Dozen" Payloads (Denial Expected)

1. **Spoofing Creation Date**: Attempt to set `createdAt` to a past or future date.
2. **Missing Fields**: Creating a message without a `message` body.
3. **Huge Payload**: Attempt to send a message longer than 2000 characters.
4. **Invalid Email**: Creating a message with an invalid email format.
5. **Unauthorized Read**: A regular user attempting to list `/messages`.
6. **Unauthorized Admin Escalation**: A user attempting to create a document in `/admins`.
7. **Modifying Immortal Fields**: Attempting to change `createdAt` on an existing message.
8. **Invalid ID**: Using a 10KB string as a message ID.
9. **Status Manipulation**: Anyone other than an admin changing a message status to 'read'.
10. **Admin Identity Spoofing**: Attempting to delete a message without being in the `/admins` collection.
11. **Shadow Fields**: Adding a `priority: "high"` field to a message (not in schema).
12. **Blanket Query**: Requesting all messages without a filter, assuming the rule protects it.

## Test Runner (Conceptual)
Verify that all the above return `PERMISSION_DENIED`.
