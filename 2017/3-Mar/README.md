3/6
---

Fundamental questions when designing a cryptographic currency.

1. How do you avoid double-spend?
2. How to prevent theft?

## 2PC (Two-phase commit protocol): a type of Atomic Commitment Protocol (ACP).

> a distributed algorithm that coordinates all processes that participates in a distributed atomic transaction on whether to commit or abort (roll back) the transaction. (a typeof consensus protocol)

- protocol achieves its goal even in many cases of temporary system failure.

In a "normal execution" in a single distributed transaction.

1. The commit request phase: a coordinator (worker, cohort, participant) process attempts to prepare all transactions's participating processes to take the necessary steps to either commit or abort transaction.
2. The commit phase: voting of the cohorts then coordinator decides whether to commit or abort.

2PC != 2PL (two phase locking)

Disadvantage of 2PC is that it is a blocking protocol:
1. if the coordinator fails permanently: some cohorts will never resolve their transactions.
2. After a cohort has sent an agreement message to the coordinator, it will block until a commit or rollback is received.

## Commitment Scheme:

> allows one to commit to a chosen value (or chosen statement) while keeping it hidden to others, whith the ability to reveal the commitment value later.

* Are designed so that a party cannot change the value after they have committed to it. (Binding).

2 phases:

1. commit phase: a value is chosen and specified.
2. reveal phase: a value is revealed and checked.

### Zero Knowledge Proofs:

A method by which one party (the prover) can prove to another party (the verifier) that a given statement is true, without conveying any information apart from the fact that the statement is indeed true.

1. to allow the prover to participate in "cut and choose" proofs where the verifier will be presented with a choice of what to learn
2. the prover will reveal only what corresponds to the verifier's choice.

> commitment schemes allow the prover to specify all the information in advance, and only reveal what should be revealed later in the proof.

A Zero Knowledge proof must satisfy 3 properties:

1. Completeness: if the statement is true, the honest verifier will be convinced of this fact by an honest prover.
2. Soundness: if the statement is false, no cheating prover can convince the honest verifier that it is true, except with some probability.
3. Zero-Knowledge: if the statement is true, no cheating verifier learns anything other than the fact that the statement is true.

[Thanks to Wikipedia](https://en.wikipedia.org/wiki/)
