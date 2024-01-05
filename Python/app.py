
import os
import threading

import matplotlib

matplotlib.use('Agg')  # Set the backend to 'Agg'

import matplotlib.pyplot as plt
import numpy as np
from flask import Flask, render_template
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

app = Flask(__name__)
N = 8  # Default board size

class NQueensSolver:
    def __init__(self, N):
        self.N = N
        # ... (rest of the __init__ method remains the same)

    def is_valid_state(self, state):
        # Check if it is a valid solution
        return True

    def get_candidates(self, state):
        return []

    def search(self, state, solutions):
        if self.is_valid_state(state):
            solutions.append(state.copy())

        for candidate in self.get_candidates(state):
            state.add(candidate)
            self.search(state, solutions)
            state.remove(candidate)

    def solve(self):
        solutions = []
        state = set()
        self.search(state, solutions)
        return solutions

    def paint_board(self):
        board = np.tile(np.eye(2)[0], (self.N, 4))
        for i in range(board.shape[0]):
            board[i] = np.roll(board[i], i)

        plt.gray()
        plt.matshow(board)
        plt.show()

    # Set up a folder to store the Matplotlib figures
    figure_folder = os.path.join(app.root_path, 'static', 'figures')
    os.makedirs(figure_folder, exist_ok=True)

    def generate_plot():
        # Your Matplotlib code here
        plt.plot([1, 2, 3], [4, 5, 6])
        plt.xlabel('X-axis')
        plt.ylabel('Y-axis')
        
        # Save the figure
        figure_path = os.path.join(figure_folder, 'plot.png')
        plt.savefig(figure_path)
        plt.close()

def main():
    N = 8
    solver = self.NQueensSolver(N)
    solver.paint_board()
    solutions = solver.solve()
    print("Number of solutions:", len(solutions))


@app.route('/')
def index():
    solver_instance = NQueensSolver(N)
    thread = threading.Thread(target=solver_instance.generate_plot)
    thread.start()
    thread.join()  # Wait for the thread to finish before rendering the template
    return render_template('index.html')

@app.route('/static/figures/<filename>')
def serve_figure(filename):
    return send_from_directory(figure_folder, filename)


if __name__ == "__main__":
    app.run(debug=True)
