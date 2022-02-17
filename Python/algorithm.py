import matplotlib.pyplot as matplot
import numpy as np


def is_valid_state(state):
    # check if it is a valid solution
    return True


def get_candidates(state):
    return []


def search(state, solutions):
    if is_valid_state(state):
        solutions.append(state.copy())
        # return

    for candidate in get_candidates(state):
        state.add(candidate)
        search(state, solutions)
        state.remove(candidate)


def solve():
    solutions = []
    state = set()
    search(state, solutions)
    return solutions


board = np.tile(np.eye(2)[0], (8, 4))
for i in range(board.shape[0]):
    board[i] = np.roll(board[i], i)

    # Create a random board
    # board[i] = np.random.permutation(board[i])

matplot.gray()
matplot.matshow(board)
matplot.show()
