# Conductor Workflow

## Overview
This workflow defines the development process for implementing tracks in this project. Each track is broken down into phases, and each phase contains specific tasks with clear completion criteria.

## Core Principles

### Test-Driven Development (TDD)
- Write tests before implementation
- Tests define the expected behavior
- Implementation exists to make tests pass
- Refactor with confidence when tests pass

### Incremental Progress
- Small, verifiable steps
- Frequent commits for each completed task
- Clear progress tracking via task status markers

### Quality Gates
- All tests must pass before marking a task complete
- Code must adhere to style guides
- No linting errors allowed

## Task Status Markers
- `[ ]` - Task not started
- `[x]` - Task completed

## Commit Frequency
- **Per Task:** Commit after every completed task
- **Commit Message Format:** `feat|fix|refactor|test: <description>`
- **Include Task Reference:** Reference the task in commit messages when applicable

## Test Coverage Requirements
- **Minimum Coverage:** >80%
- **Critical Paths:** 100% coverage for core business logic
- **New Code:** All new code must be covered by tests

## Phase Completion Verification and Checkpointing Protocol

### Purpose
Ensure each phase is fully complete and verified before proceeding to the next phase.

### Process
1. **Complete All Tasks:** All tasks in the phase must be marked `[x]`
2. **Run Verification:** Execute all tests and verify they pass
3. **Update Metadata:** Update `metadata.json` with `updated_at` timestamp
4. **Checkpoint Commit:** Create a commit with message format: `checkpoint: Complete <Phase Name>`
5. **User Manual Verification:** A human must review and verify the phase output

### User Manual Verification Task
Each phase must include a final meta-task:
```markdown
- [ ] Task: Conductor - User Manual Verification '<Phase Name>' (Protocol in workflow.md)
```

This task requires:
1. Manual review of all completed work
2. Verification against phase objectives
3. Sign-off before proceeding to next phase

## Implementation Process

### For Each Task:
1. **Read the task** carefully
2. **Write tests** that define success
3. **Implement the feature** to make tests pass
4. **Run tests** to verify
5. **Commit** with appropriate message
6. **Mark task complete** `[x]`

### For Each Phase:
1. Complete all tasks in the phase
2. Run full test suite
3. Verify no linting errors
4. Complete the User Manual Verification task
5. Create checkpoint commit
6. Update track metadata

## File Organization
- Keep related files together
- Follow the project's established structure
- Respect the code style guides in `conductor/code_styleguides/`

## Documentation
- Update documentation as you go
- Keep README current
- Document non-obvious decisions in code comments
