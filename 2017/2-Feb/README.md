Oauth2: an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service,
 (google, ...)

Abstract Protocol Flow:

```
     +--------+                               +---------------+
     |        |--(A)- Authorization Request ->|   Resource    |
     |        |                               |     Owner     |
     |        |<-(B)-- Authorization Grant ---|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(C)-- Authorization Grant -->| Authorization |
     | Client |                               |     Server    |
     |        |<-(D)----- Access Token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +---------------+
```

Refreshing an Expired Access Token:

```
  +--------+                                           +---------------+
  |        |--(A)------- Authorization Grant --------->|               |
  |        |                                           |               |
  |        |<-(B)----------- Access Token -------------|               |
  |        |               & Refresh Token             |               |
  |        |                                           |               |
  |        |                            +----------+   |               |
  |        |--(C)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(D)- Protected Resource --| Resource |   | Authorization |
  | Client |                            |  Server  |   |     Server    |
  |        |--(E)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(F)- Invalid Token Error -|          |   |               |
  |        |                            +----------+   |               |
  |        |                                           |               |
  |        |--(G)----------- Refresh Token ----------->|               |
  |        |                                           |               |
  |        |<-(H)----------- Access Token -------------|               |
  +--------+           & Optional Refresh Token        +---------------+

```

[ietf spec](https://tools.ietf.org/html/rfc6749)

02/18
-----

Chapter 2: Entity Relationship Model

The Entity-relationship (ER) data model: allows us to describe data involved in a real world entreprise in terms of objects and their relationships and is widely used to develop an initial database design.

conceptual database design:

Steps in database design:

- Requirement Analysis: (what data is stored, what applications are built, what operations are most frequent)
- conceptual db design: Info through requirement analysis (high-level description of the data to be stored, along with constraints that are known to hold over this data.
- Logical Database Design: convert the conceptual database into a db schema in the data model.
- Schema Refinement: Analyze the collection of relations in our relational db schema and identify potential problems to refine it.
- Physical Database Design: Refine db design based on typical usage to meet desired performance criteria.
- Security Design: identify the different user groups and make sure that they can only have intended access.

db lexicon:

entity: an object in the real world that is distinguishable from other objects.

entity set: collection of similar entities

key: a minimal set of attributes whose values uniquely identify an entity in the set. (primary, candidate)

specialization: the process of identifying subsets of an entity set (the superclass: some distinguishing characteristics).

aggregation: allow us to indicate that a relationship set participates in another relationship set.

weak entity set: always participates in a one-to-many binary relationship and has a key constraint and total participation.

integrity constraints: conditions on a database schema that every legal database instance has to satisfy.

a view: a relation whose instance is not explicitly stored but is computed as needed.

Source: Database Management Systems second edition by Ramakrishna / Gehrke
