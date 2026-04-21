# Senior SDE Interview Prep — Complete Day-by-Day Plan
## Krishna Chaitanya Bogavalli | 12 Weeks | Python | Start: April 21, 2026

---

## How to Use This Plan

### Daily Workflow for Each Problem:
```
1. READ pattern on Educative.io (only when starting a new pattern)
2. ATTEMPT the LeetCode problem for 25-30 min WITHOUT hints
3. If stuck → read only the APPROACH (not code) from NeetCode video
4. IMPLEMENT the solution yourself
5. SUBMIT on LeetCode
6. REVIEW the NeetCode video explanation fully
7. LOG in your tracking sheet (time, solved alone?, notes)
8. If you solved it → move on. If not → mark for re-solve in 3 days.
```

### Time Guide:
- **Busy day (30 min)**: Do 1 Easy OR review yesterday's hard problem
- **Normal day (1-1.5 hr)**: Do 2 problems
- **Good day (2 hr)**: Do 2-3 problems + pattern reading
- **Weekend (1-2 hr)**: System Design session + 1-2 review problems

### Links:
- LeetCode: `https://leetcode.com/problems/{slug}/`
- NeetCode: `https://neetcode.io/problems/{slug}` (or YouTube search "NeetCode {problem name}")
- Educative Grokking: `https://www.educative.io/courses/grokking-the-coding-interview`

---

# WEEK 1: Arrays & Hashing
**Pattern to learn**: Hash maps for O(1) lookup, frequency counting, grouping
**Educative section**: Grokking → "Pattern: Hashing" (read Monday before solving)

## Monday (Day 1)
*Start with Educative: Read the Arrays & Hashing pattern intro*

| | Problem | LC# | Difficulty | Link | NeetCode Video | Target | Done |
|-|---------|-----|-----------|------|---------------|--------|------|
| 1 | Two Sum | 1 | Easy | leetcode.com/problems/two-sum | neetcode.io/problems/two-integer-sum | 15 min | [ ] |
| 2 | Contains Duplicate | 217 | Easy | leetcode.com/problems/contains-duplicate | neetcode.io/problems/duplicate-integer | 10 min | [ ] |

**Key concept**: HashMap to store complements / seen values. O(n) time, O(n) space.

## Tuesday (Day 2)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 3 | Valid Anagram | 242 | Easy | leetcode.com/problems/valid-anagram | 15 min | [ ] |
| 4 | Group Anagrams | 49 | Medium | leetcode.com/problems/group-anagrams | 25 min | [ ] |

**Key concept**: Sorting as key vs. character count tuple as key for grouping.

## Wednesday (Day 3)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 5 | Top K Frequent Elements | 347 | Medium | leetcode.com/problems/top-k-frequent-elements | 25 min | [ ] |
| 6 | Encode and Decode Strings | 271 | Medium | leetcode.com/problems/encode-and-decode-strings | 25 min | [ ] |

**Key concept**: Bucket sort for frequency. Delimiter encoding for strings.

## Thursday (Day 4)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 7 | Product of Array Except Self | 238 | Medium | leetcode.com/problems/product-of-array-except-self | 25 min | [ ] |

**Key concept**: Prefix and suffix products without division. O(n) time, O(1) extra space.

*If time: re-solve any problem from Mon-Wed you struggled with*

## Friday (Day 5)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 8 | Longest Consecutive Sequence | 128 | Medium | leetcode.com/problems/longest-consecutive-sequence | 30 min | [ ] |
| 9 | Valid Sudoku | 36 | Medium | leetcode.com/problems/valid-sudoku | 25 min | [ ] |

**Key concept**: HashSet for O(1) lookup, only start counting from sequence beginning.

## Saturday (Day 6) — Weekend
**System Design (1 hr)**: Read DDIA Chapter 1 — Reliable, Scalable, and Maintainable Applications
- Key takeaways to note: What is reliability? Scalability? Load parameters? Performance metrics?

*Optional*: Re-solve 1 problem from this week you found hard

## Sunday (Day 7) — REST
Light only: Watch 1 NeetCode video on any problem you want to revisit. Or rest completely.

### Week 1 Totals: 9 problems (3 Easy, 6 Medium) + DDIA Ch 1

---

# WEEK 2: Two Pointers + Sliding Window
**Educative sections**: Grokking → "Two Pointers" + "Sliding Window"

## Monday (Day 8)
*Read Educative: Two Pointers pattern*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 10 | Valid Palindrome | 125 | Easy | leetcode.com/problems/valid-palindrome | 15 min | [ ] |
| 11 | Two Sum II - Sorted | 167 | Medium | leetcode.com/problems/two-sum-ii-input-array-is-sorted | 20 min | [ ] |

**Key concept**: Left/right pointers moving inward. alphanumeric filtering.

## Tuesday (Day 9)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 12 | 3Sum | 15 | Medium | leetcode.com/problems/3sum | 30 min | [ ] |
| 13 | Container With Most Water | 11 | Medium | leetcode.com/problems/container-with-most-water | 25 min | [ ] |

**Key concept**: Sort + skip duplicates for 3Sum. Greedy pointer movement for container.

## Wednesday (Day 10)
*Read Educative: Sliding Window pattern*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 14 | Best Time to Buy and Sell Stock | 121 | Easy | leetcode.com/problems/best-time-to-buy-and-sell-stock | 15 min | [ ] |
| 15 | Longest Substring Without Repeating | 3 | Medium | leetcode.com/problems/longest-substring-without-repeating-characters | 25 min | [ ] |

**Key concept**: Track min price. Expand/shrink window using hashset.

## Thursday (Day 11)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 16 | Longest Repeating Char Replacement | 424 | Medium | leetcode.com/problems/longest-repeating-character-replacement | 30 min | [ ] |
| 17 | Permutation in String | 567 | Medium | leetcode.com/problems/permutation-in-string | 25 min | [ ] |

**Key concept**: Window size - max_freq ≤ k. Fixed-size sliding window with char count.

## Friday (Day 12)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 18 | Minimum Window Substring | 76 | Hard | leetcode.com/problems/minimum-window-substring | 35 min | [ ] |

**Key concept**: Expand to satisfy, shrink to minimize. Two hash maps (need vs have).
*This is a HARD — spend 35 min, then watch NeetCode video if stuck. Re-solve tomorrow.*

## Saturday (Day 13) — Weekend
**System Design (1 hr)**: Read DDIA Chapter 2 — Data Models and Query Languages
- Key: Relational vs Document vs Graph models. When to use each.

*Re-solve*: Minimum Window Substring (LC 76) if you didn't get it Friday

## Sunday (Day 14) — REST

### Week 2 Totals: 9 problems (2 Easy, 6 Medium, 1 Hard) + DDIA Ch 2

---

# WEEK 3: Stack + Binary Search
**Educative sections**: Grokking → "Stacks" + "Modified Binary Search"

## Monday (Day 15)
*Read Educative: Stack patterns*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 19 | Valid Parentheses | 20 | Easy | leetcode.com/problems/valid-parentheses | 10 min | [ ] |
| 20 | Min Stack | 155 | Medium | leetcode.com/problems/min-stack | 20 min | [ ] |

## Tuesday (Day 16)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 21 | Evaluate Reverse Polish Notation | 150 | Medium | leetcode.com/problems/evaluate-reverse-polish-notation | 20 min | [ ] |
| 22 | Generate Parentheses | 22 | Medium | leetcode.com/problems/generate-parentheses | 25 min | [ ] |

## Wednesday (Day 17)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 23 | Daily Temperatures | 739 | Medium | leetcode.com/problems/daily-temperatures | 25 min | [ ] |
| 24 | Car Fleet | 853 | Medium | leetcode.com/problems/car-fleet | 30 min | [ ] |

**Key concept**: Monotonic stack — process from right or left, pop smaller elements.

## Thursday (Day 18)
*Read Educative: Modified Binary Search pattern*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 25 | Binary Search | 704 | Easy | leetcode.com/problems/binary-search | 10 min | [ ] |
| 26 | Search a 2D Matrix | 74 | Medium | leetcode.com/problems/search-a-2d-matrix | 20 min | [ ] |

## Friday (Day 19)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 27 | Koko Eating Bananas | 875 | Medium | leetcode.com/problems/koko-eating-bananas | 25 min | [ ] |
| 28 | Find Min in Rotated Sorted Array | 153 | Medium | leetcode.com/problems/find-minimum-in-rotated-sorted-array | 25 min | [ ] |

**Key concept**: Binary search on answer space (Koko). Identify sorted half (rotated).

## Saturday (Day 20) — Weekend
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 29 | Search in Rotated Sorted Array | 33 | Medium | leetcode.com/problems/search-in-rotated-sorted-array | 25 min | [ ] |

**System Design (45 min)**: Read DDIA Chapter 3 — Storage and Retrieval (LSM-trees vs B-trees)

## Sunday (Day 21) — REST
Optional: Watch NeetCode video on Largest Rectangle in Histogram (LC 84) — hard stack problem, preview for later.

### Week 3 Totals: 11 problems (2 Easy, 8 Medium, 1 Hard preview) + DDIA Ch 3

---

# WEEK 4: Linked List + SD: URL Shortener
**Educative sections**: Grokking → "In-place LL Reversal" + "Fast & Slow Pointers"

## Monday (Day 22)
*Read Educative: Fast & Slow Pointers + LL Reversal patterns*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 30 | Reverse Linked List | 206 | Easy | leetcode.com/problems/reverse-linked-list | 15 min | [ ] |
| 31 | Merge Two Sorted Lists | 21 | Easy | leetcode.com/problems/merge-two-sorted-lists | 15 min | [ ] |

## Tuesday (Day 23)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 32 | Linked List Cycle | 141 | Easy | leetcode.com/problems/linked-list-cycle | 10 min | [ ] |
| 33 | Reorder List | 143 | Medium | leetcode.com/problems/reorder-list | 25 min | [ ] |

**Key concept**: Fast/slow to find middle. Reverse second half. Merge alternating.

## Wednesday (Day 24)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 34 | Remove Nth Node From End | 19 | Medium | leetcode.com/problems/remove-nth-node-from-end-of-list | 20 min | [ ] |
| 35 | Copy List with Random Pointer | 138 | Medium | leetcode.com/problems/copy-list-with-random-pointer | 25 min | [ ] |

## Thursday (Day 25)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 36 | Add Two Numbers | 2 | Medium | leetcode.com/problems/add-two-numbers | 20 min | [ ] |
| 37 | Linked List Cycle II | 142 | Medium | leetcode.com/problems/linked-list-cycle-ii | 25 min | [ ] |

## Friday (Day 26)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 38 | Find the Duplicate Number | 287 | Medium | leetcode.com/problems/find-the-duplicate-number | 25 min | [ ] |
| 39 | Merge K Sorted Lists | 23 | Hard | leetcode.com/problems/merge-k-sorted-lists | 30 min | [ ] |

**Key concept**: Floyd's cycle detection for duplicate. Divide & conquer or heap for k-merge.

## Saturday (Day 27) — Weekend
**System Design (1.5 hr)**: Design URL Shortener (TinyURL)
- Resource: Educative Grokking SD → "Design TinyURL" OR Alex Xu Ch 8
- Cover: Hashing (base62), collision handling, read vs write ratio, caching, analytics
- Write up your design in `system-design/designs/01-url-shortener.md`

## Sunday (Day 28) — REST

### Week 4 Totals: 10 problems (3 Easy, 6 Medium, 1 Hard) + SD: URL Shortener

---

# WEEK 5: Trees (BFS/DFS)
**Educative sections**: Grokking → "Tree BFS" + "Tree DFS"
*This is the biggest pattern — 2 full weeks of problems*

## Monday (Day 29)
*Read Educative: Tree DFS pattern (preorder, inorder, postorder)*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 40 | Invert Binary Tree | 226 | Easy | leetcode.com/problems/invert-binary-tree | 10 min | [ ] |
| 41 | Maximum Depth of Binary Tree | 104 | Easy | leetcode.com/problems/maximum-depth-of-binary-tree | 10 min | [ ] |

## Tuesday (Day 30)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 42 | Diameter of Binary Tree | 543 | Easy | leetcode.com/problems/diameter-of-binary-tree | 15 min | [ ] |
| 43 | Balanced Binary Tree | 110 | Easy | leetcode.com/problems/balanced-binary-tree | 15 min | [ ] |

## Wednesday (Day 31)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 44 | Same Tree | 100 | Easy | leetcode.com/problems/same-tree | 10 min | [ ] |
| 45 | Subtree of Another Tree | 572 | Easy | leetcode.com/problems/subtree-of-another-tree | 20 min | [ ] |

## Thursday (Day 32)
*Read Educative: Tree BFS pattern (level-order traversal)*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 46 | Binary Tree Level Order Traversal | 102 | Medium | leetcode.com/problems/binary-tree-level-order-traversal | 20 min | [ ] |
| 47 | Binary Tree Right Side View | 199 | Medium | leetcode.com/problems/binary-tree-right-side-view | 20 min | [ ] |

## Friday (Day 33)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 48 | Lowest Common Ancestor of BST | 235 | Medium | leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree | 20 min | [ ] |
| 49 | Validate BST | 98 | Medium | leetcode.com/problems/validate-binary-search-tree | 25 min | [ ] |

## Saturday (Day 34) — Weekend
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 50 | Kth Smallest Element in BST | 230 | Medium | leetcode.com/problems/kth-smallest-element-in-a-bst | 20 min | [ ] |

**System Design (45 min)**: Design Rate Limiter
- Resource: Educative Grokking SD → "Design Rate Limiter" OR Alex Xu Ch 4
- Cover: Token bucket, sliding window, fixed window, distributed rate limiting

## Sunday (Day 35) — REST

### Week 5 Totals: 11 problems (6 Easy, 5 Medium) + SD: Rate Limiter

---

# WEEK 6: Trees (continued) + Graphs (start) + SD: Chat System
**Educative sections**: Grokking → "Graph BFS/DFS" + "Topological Sort"

## Monday (Day 36)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 51 | Construct Binary Tree from Preorder & Inorder | 105 | Medium | leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal | 30 min | [ ] |
| 52 | Count Good Nodes in Binary Tree | 1448 | Medium | leetcode.com/problems/count-good-nodes-in-binary-tree | 20 min | [ ] |

## Tuesday (Day 37)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 53 | Binary Tree Max Path Sum | 124 | Hard | leetcode.com/problems/binary-tree-maximum-path-sum | 35 min | [ ] |
| 54 | Serialize and Deserialize Binary Tree | 297 | Hard | leetcode.com/problems/serialize-and-deserialize-binary-tree | 35 min | [ ] |

**Key concept**: Global max tracking with DFS. Preorder traversal for serialize.

## Wednesday (Day 38)
*Read Educative: Graph BFS/DFS pattern*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 55 | Number of Islands | 200 | Medium | leetcode.com/problems/number-of-islands | 20 min | [ ] |
| 56 | Clone Graph | 133 | Medium | leetcode.com/problems/clone-graph | 25 min | [ ] |

## Thursday (Day 39)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 57 | Max Area of Island | 695 | Medium | leetcode.com/problems/max-area-of-island | 20 min | [ ] |
| 58 | Pacific Atlantic Water Flow | 417 | Medium | leetcode.com/problems/pacific-atlantic-water-flow | 30 min | [ ] |

## Friday (Day 40)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 59 | Rotting Oranges | 994 | Medium | leetcode.com/problems/rotting-oranges | 25 min | [ ] |
| 60 | Surrounded Regions | 130 | Medium | leetcode.com/problems/surrounded-regions | 25 min | [ ] |

**Key concept**: Multi-source BFS (rotting oranges). Border DFS (surrounded regions).

## Saturday (Day 41) — Weekend
**System Design (1.5 hr)**: Design Chat System (WhatsApp)
- Resource: Alex Xu Ch 12 / Educative
- Cover: WebSockets, message ordering, delivery receipts, group chat, presence, media
- Write up: `system-design/designs/02-chat-system.md`

## Sunday (Day 42) — REST
*Halfway point!* Review your progress. Update confidence ratings.

### Week 6 Totals: 10 problems (0 Easy, 8 Medium, 2 Hard) + SD: Chat System

---

# WEEK 7: Graphs (continued) + Heap + SD: News Feed
**Educative sections**: Grokking → "Topological Sort" + "Top K Elements" + "K-way Merge"

## Monday (Day 43)
*Read Educative: Topological Sort pattern*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 61 | Course Schedule | 207 | Medium | leetcode.com/problems/course-schedule | 25 min | [ ] |
| 62 | Course Schedule II | 210 | Medium | leetcode.com/problems/course-schedule-ii | 25 min | [ ] |

## Tuesday (Day 44)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 63 | Redundant Connection | 684 | Medium | leetcode.com/problems/redundant-connection | 25 min | [ ] |
| 64 | Number of Connected Components | 323 | Medium | leetcode.com/problems/number-of-connected-components-in-an-undirected-graph | 20 min | [ ] |

**Key concept**: Union-Find (Disjoint Set Union) — path compression + union by rank.

## Wednesday (Day 45)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 65 | Graph Valid Tree | 261 | Medium | leetcode.com/problems/graph-valid-tree | 20 min | [ ] |
| 66 | Word Ladder | 127 | Hard | leetcode.com/problems/word-ladder | 35 min | [ ] |

## Thursday (Day 46)
*Read Educative: Top K Elements + K-way Merge patterns*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 67 | Kth Largest Element in Stream | 703 | Easy | leetcode.com/problems/kth-largest-element-in-a-stream | 15 min | [ ] |
| 68 | Last Stone Weight | 1046 | Easy | leetcode.com/problems/last-stone-weight | 10 min | [ ] |

## Friday (Day 47)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 69 | Kth Largest Element in Array | 215 | Medium | leetcode.com/problems/kth-largest-element-in-an-array | 20 min | [ ] |
| 70 | K Closest Points to Origin | 973 | Medium | leetcode.com/problems/k-closest-points-to-origin | 20 min | [ ] |

**Key concept**: Min-heap of size k for top-k. Quickselect for O(n) average.

## Saturday (Day 48) — Weekend
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 71 | Task Scheduler | 621 | Medium | leetcode.com/problems/task-scheduler | 30 min | [ ] |

**System Design (1 hr)**: Design News Feed / Twitter Timeline
- Resource: Alex Xu Ch 11 / Educative
- Cover: Fan-out on write vs read, ranking algorithm, caching strategy, pagination

## Sunday (Day 49) — REST

### Week 7 Totals: 11 problems (2 Easy, 8 Medium, 1 Hard) + SD: News Feed

---

# WEEK 8: Backtracking + DP 1D (start) + SD: YouTube
**Educative sections**: Grokking → "Subsets" + "DP: 0/1 Knapsack" + "DP: Fibonacci Numbers"

## Monday (Day 50)
*Read Educative: Subsets / Backtracking pattern*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 72 | Subsets | 78 | Medium | leetcode.com/problems/subsets | 20 min | [ ] |
| 73 | Combination Sum | 39 | Medium | leetcode.com/problems/combination-sum | 25 min | [ ] |

## Tuesday (Day 51)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 74 | Permutations | 46 | Medium | leetcode.com/problems/permutations | 20 min | [ ] |
| 75 | Subsets II | 90 | Medium | leetcode.com/problems/subsets-ii | 25 min | [ ] |

## Wednesday (Day 52)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 76 | Combination Sum II | 40 | Medium | leetcode.com/problems/combination-sum-ii | 25 min | [ ] |
| 77 | Word Search | 79 | Medium | leetcode.com/problems/word-search | 25 min | [ ] |

## Thursday (Day 53)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 78 | Palindrome Partitioning | 131 | Medium | leetcode.com/problems/palindrome-partitioning | 30 min | [ ] |
| 79 | Letter Combinations of Phone Number | 17 | Medium | leetcode.com/problems/letter-combinations-of-a-phone-number | 20 min | [ ] |

## Friday (Day 54)
*Read Educative: DP — Fibonacci Numbers pattern*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 80 | Climbing Stairs | 70 | Easy | leetcode.com/problems/climbing-stairs | 10 min | [ ] |
| 81 | Min Cost Climbing Stairs | 746 | Easy | leetcode.com/problems/min-cost-climbing-stairs | 15 min | [ ] |
| 82 | House Robber | 198 | Medium | leetcode.com/problems/house-robber | 20 min | [ ] |

**Key concept**: Start DP here — base case + recurrence relation. Bottom-up tabulation.

## Saturday (Day 55) — Weekend
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 83 | N-Queens | 51 | Hard | leetcode.com/problems/n-queens | 35 min | [ ] |

**System Design (1 hr)**: Design YouTube/Netflix
- Resource: Alex Xu Vol 2 / ByteByteGo
- Cover: Video upload & transcoding pipeline, adaptive bitrate, CDN, recommendation basics

## Sunday (Day 56) — REST

### Week 8 Totals: 12 problems (2 Easy, 9 Medium, 1 Hard) + SD: YouTube

---

# WEEK 9: DP Deep Dive + Tries + SD: Uber
**Educative sections**: Grokking → "DP: 0/1 Knapsack" + "DP: Longest Common Substring"

## Monday (Day 57)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 84 | House Robber II | 213 | Medium | leetcode.com/problems/house-robber-ii | 25 min | [ ] |
| 85 | Longest Palindromic Substring | 5 | Medium | leetcode.com/problems/longest-palindromic-substring | 30 min | [ ] |

## Tuesday (Day 58)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 86 | Palindromic Substrings | 647 | Medium | leetcode.com/problems/palindromic-substrings | 25 min | [ ] |
| 87 | Decode Ways | 91 | Medium | leetcode.com/problems/decode-ways | 25 min | [ ] |

## Wednesday (Day 59)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 88 | Coin Change | 322 | Medium | leetcode.com/problems/coin-change | 25 min | [ ] |
| 89 | Maximum Product Subarray | 152 | Medium | leetcode.com/problems/maximum-product-subarray | 25 min | [ ] |

**Key concept**: Track both max and min (negatives can flip). Classic DP transitions.

## Thursday (Day 60)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 90 | Word Break | 139 | Medium | leetcode.com/problems/word-break | 25 min | [ ] |
| 91 | Longest Increasing Subsequence | 300 | Medium | leetcode.com/problems/longest-increasing-subsequence | 25 min | [ ] |

## Friday (Day 61)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 92 | Partition Equal Subset Sum | 416 | Medium | leetcode.com/problems/partition-equal-subset-sum | 30 min | [ ] |
| 93 | Implement Trie | 208 | Medium | leetcode.com/problems/implement-trie-prefix-tree | 25 min | [ ] |

## Saturday (Day 62) — Weekend
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 94 | Design Add & Search Words | 211 | Medium | leetcode.com/problems/design-add-and-search-words-data-structure | 25 min | [ ] |

**System Design (1 hr)**: Design Uber/Lyft
- Resource: HelloInterview / ByteByteGo
- Cover: Geo-spatial indexing (geohash/quadtree), matching, ETA, surge pricing, real-time tracking

## Sunday (Day 63) — REST

### Week 9 Totals: 11 problems (0 Easy, 11 Medium) + SD: Uber

---

# WEEK 10: DP 2D + Greedy + Intervals + SD: Payment System
**Educative sections**: Grokking → "DP: Longest Common Substring" + "Merge Intervals"

## Monday (Day 64)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 95 | Unique Paths | 62 | Medium | leetcode.com/problems/unique-paths | 20 min | [ ] |
| 96 | Longest Common Subsequence | 1143 | Medium | leetcode.com/problems/longest-common-subsequence | 25 min | [ ] |

## Tuesday (Day 65)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 97 | Best Time Buy/Sell Stock with Cooldown | 309 | Medium | leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown | 30 min | [ ] |
| 98 | Coin Change 2 | 518 | Medium | leetcode.com/problems/coin-change-2 | 25 min | [ ] |

## Wednesday (Day 66)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 99 | Target Sum | 494 | Medium | leetcode.com/problems/target-sum | 25 min | [ ] |
| 100 | Edit Distance | 72 | Medium | leetcode.com/problems/edit-distance | 30 min | [ ] |

**Milestone: Problem #100!**

## Thursday (Day 67)
*Read Educative: Merge Intervals pattern*

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 101 | Insert Interval | 57 | Medium | leetcode.com/problems/insert-interval | 20 min | [ ] |
| 102 | Merge Intervals | 56 | Medium | leetcode.com/problems/merge-intervals | 20 min | [ ] |
| 103 | Non-overlapping Intervals | 435 | Medium | leetcode.com/problems/non-overlapping-intervals | 20 min | [ ] |

## Friday (Day 68)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 104 | Maximum Subarray | 53 | Medium | leetcode.com/problems/maximum-subarray | 15 min | [ ] |
| 105 | Jump Game | 55 | Medium | leetcode.com/problems/jump-game | 20 min | [ ] |
| 106 | Jump Game II | 45 | Medium | leetcode.com/problems/jump-game-ii | 25 min | [ ] |

## Saturday (Day 69) — Weekend
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 107 | Gas Station | 134 | Medium | leetcode.com/problems/gas-station | 25 min | [ ] |
| 108 | Partition Labels | 763 | Medium | leetcode.com/problems/partition-labels | 20 min | [ ] |

**System Design (1 hr)**: Design Payment System (Stripe-like)
- Cover: Idempotency, exactly-once processing, ledger, double-entry bookkeeping, PCI compliance

## Sunday (Day 70) — REST

### Week 10 Totals: 14 problems (0 Easy, 14 Medium) + SD: Payment System

---

# WEEK 11: Bit Manipulation + Design Problems + Behavioral + SD: Recommendation System
**Focus: Fill remaining patterns + write STAR stories**

## Monday (Day 71)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 109 | Single Number | 136 | Easy | leetcode.com/problems/single-number | 10 min | [ ] |
| 110 | Number of 1 Bits | 191 | Easy | leetcode.com/problems/number-of-1-bits | 10 min | [ ] |
| 111 | Counting Bits | 338 | Easy | leetcode.com/problems/counting-bits | 10 min | [ ] |
| 112 | Reverse Bits | 190 | Easy | leetcode.com/problems/reverse-bits | 10 min | [ ] |
| 113 | Missing Number | 268 | Easy | leetcode.com/problems/missing-number | 10 min | [ ] |

*Quick pattern day — knock out all easy bit manipulation*

**Evening: Write STAR stories 1-3** (see behavioral section)

## Tuesday (Day 72)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 114 | Sum of Two Integers | 371 | Medium | leetcode.com/problems/sum-of-two-integers | 25 min | [ ] |
| 115 | Reverse Integer | 7 | Medium | leetcode.com/problems/reverse-integer | 15 min | [ ] |

**Write STAR stories 4-6**

## Wednesday (Day 73)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 116 | LRU Cache | 146 | Medium | leetcode.com/problems/lru-cache | 30 min | [ ] |
| 117 | Insert Delete GetRandom O(1) | 380 | Medium | leetcode.com/problems/insert-delete-getrandom-o1 | 25 min | [ ] |

**Key concept**: HashMap + Doubly Linked List for LRU. HashMap + Array for GetRandom.

## Thursday (Day 74)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 118 | Time Based Key-Value Store | 981 | Medium | leetcode.com/problems/time-based-key-value-store | 25 min | [ ] |
| 119 | Find Median from Data Stream | 295 | Hard | leetcode.com/problems/find-median-from-data-stream | 30 min | [ ] |

**Write STAR stories 7-8**

## Friday (Day 75)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 120 | Design Twitter | 355 | Medium | leetcode.com/problems/design-twitter | 30 min | [ ] |
| 121 | Trapping Rain Water | 42 | Hard | leetcode.com/problems/trapping-rain-water | 30 min | [ ] |

**Write STAR stories 9-10**

## Saturday (Day 76) — Weekend
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 122 | Word Search II | 212 | Hard | leetcode.com/problems/word-search-ii | 35 min | [ ] |

**System Design (1 hr)**: Design Recommendation System (ML system — hot topic!)
- Cover: Collaborative filtering, content-based, feature store, online vs batch inference

## Sunday (Day 77) — REST

### Week 11 Totals: 14 problems (5 Easy, 6 Medium, 3 Hard) + SD: Recommendation System + 10 STAR stories

---

# WEEK 12: Mock Interviews + Polish + Final Hard Problems
**Focus: Simulate real interviews, fill gaps, build confidence**

## Monday (Day 78)
**Timed Practice**: Set 45-min timer, solve these without hints:

| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 123 | Median of Two Sorted Arrays | 4 | Hard | leetcode.com/problems/median-of-two-sorted-arrays | 40 min | [ ] |

*Review any weak pattern — re-solve 2 problems you previously struggled with*

## Tuesday (Day 79)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 124 | Largest Rectangle in Histogram | 84 | Hard | leetcode.com/problems/largest-rectangle-in-histogram | 35 min | [ ] |
| 125 | Sliding Window Maximum | 239 | Hard | leetcode.com/problems/sliding-window-maximum | 30 min | [ ] |

**Evening: System Design mock** — pick any design, time 45 min, present out loud

## Wednesday (Day 80)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 126 | Minimum Interval to Include Each Query | 1851 | Hard | leetcode.com/problems/minimum-interval-to-include-each-query | 35 min | [ ] |
| 127 | Burst Balloons | 312 | Hard | leetcode.com/problems/burst-balloons | 35 min | [ ] |

## Thursday (Day 81)
**Behavioral Mock**: Use Claude as interviewer
- Practice 4-5 STAR stories out loud
- Ask Claude to give feedback on impact and clarity

*Re-solve 2-3 medium problems from weak patterns*

## Friday (Day 82)
| | Problem | LC# | Difficulty | Link | Target | Done |
|-|---------|-----|-----------|------|--------|------|
| 128 | Meeting Rooms II | 253 | Medium | leetcode.com/problems/meeting-rooms-ii | 20 min | [ ] |
| 129 | Alien Dictionary | 269 | Hard | leetcode.com/problems/alien-dictionary | 35 min | [ ] |
| 130 | LFU Cache | 460 | Hard | leetcode.com/problems/lfu-cache | 35 min | [ ] |

## Saturday (Day 83) — Full Mock Interview Day
**Morning (2 hrs)**:
- 45 min: Solve 2 random mediums (use LeetCode random picker)
- 45 min: System Design — Design a Distributed Message Queue (Kafka)
- 30 min: Behavioral — practice 3 stories rapid-fire

**System Design write-up**: `system-design/designs/12-message-queue.md`

## Sunday (Day 84) — Review & Plan Next Steps
- Review all 12 weekly check-ins
- Rate yourself: Coding (1-5), System Design (1-5), Behavioral (1-5)
- Identify remaining weak areas
- Start building target company list
- Update resume with quantified achievements
- **Begin strategic job applications**

### Week 12 Totals: 8 new problems (1 Medium, 7 Hard) + Full mock + Resume

---

# GRAND TOTALS

| Category | Count |
|----------|-------|
| **Total LeetCode problems** | **130** |
| Easy | 20 |
| Medium | 88 |
| Hard | 22 |
| **System Design topics** | **12** |
| **Behavioral STAR stories** | **10** |
| **Mock interviews** | **3+ (minimum)** |
| **DDIA chapters read** | **3-4** |

---

# POST WEEK 12: Company-Specific Prep
*Once you start getting interviews, add 20-30 company-tagged problems*

### How to prep for a specific company:
1. Go to `seanprashad.com/leetcode-patterns` → filter by company
2. Go to LeetCode → Explore → Company tags (Premium)
3. Focus on their top 15-20 most frequent problems
4. Do 2-3 mock interviews simulating their format

### Company Interview Formats (2025-2026):
| Company | Rounds | Format |
|---------|--------|--------|
| Amazon | 5-6 | Heavy LP behavioral + coding + SD |
| Google | 4-5 | Hard coding + open SD + Googleyness |
| Meta | 4 | 2 coding + 1 SD + 1 behavioral |
| Microsoft | 4-5 | Practical coding + SD + culture |
| Apple | 4-5 | Team-specific, deep domain |
| Netflix | 4-5 | Senior-only, culture fit heavy |

---

# BEHAVIORAL: 10 STAR Stories Template

Write each story in this format:
```
## Story [N]: [Title]
**Theme**: [Leadership / Debugging / Collaboration / etc.]
**Where**: SAP Concur, T2 Air Team

**Situation**: [2-3 sentences — set the scene]
**Task**: [What was your specific responsibility?]
**Action**: [3-5 bullet points — what YOU did, not the team]
**Result**: [Quantified outcome — metrics, impact, what changed]
**Learnings**: [What would you do differently?]

**Can be used for**: [List LP/behavioral question types this fits]
```

### Story Topics from Your SAP Experience:
1. Led Ryanair Digital API Migration (technical leadership, ambiguity)
2. Fixed T2AIR-47240 Quote Bug in finishing flow (debugging, ownership)
3. T1 monolith + T2 microservices integration (cross-team collaboration)
4. NDC-Hub architecture decisions (system design, tradeoffs)
5. Supply Logger Request Context (T2AIR-26877) (handling ambiguity)
6. Kubernetes/Helm operations & incident response (operational excellence)
7. Code reviews & team mentoring (mentoring, raising the bar)
8. Production incident handling with PagerDuty (under pressure)
9. DevOps automation with Claude Code skills (innovation, efficiency)
10. V1 PR bug → V2 fix cycle (failure, learning, iteration)

---

# SYSTEM DESIGN TEMPLATE

For each design, write up in this format:
```
## Design: [System Name]
**Date**: [when studied]
**Confidence**: [1-5]

### Requirements
- Functional: [list]
- Non-functional: [latency, throughput, availability targets]
- Scale: [users, QPS, storage estimates]

### High-Level Design
[Paste or describe your diagram]

### Key Components
1. [Component] — [why this technology]
2. [Component] — [why this technology]

### Deep Dives
- [Critical component 1]: [detailed discussion]
- [Critical component 2]: [detailed discussion]

### Trade-offs
- [Decision 1]: chose X over Y because [reason]
- [Decision 2]: chose X over Y because [reason]

### What I'd Discuss If Asked
- Monitoring & alerting
- Deployment strategy
- Cost considerations
- Evolution over time
```
