#include <iostream>
#include <vector>
#include <math.h>
using namespace std;

int matrixScore(vector<vector<int>> &grid)
{
        int r = grid.size();
        int c = grid[0].size();
        int score = 0;
        // for (int i=0; i<r; i++){
        //     int num=0;
        //     for (int j=0; j<c; j++){
        //         num+=grid[i][j]*pow(2,i);
        //     }
        //     score+=num;
        // }
        // return score;
        for (int i = 0; i < r; i++)
        {
                if (grid[i][0] == 0)
                {
                        for (int j = 0; j < c; j++)
                        {
                                if (grid[i][j] == 1)
                                        grid[i][j] = 0;
                                else
                                        grid[i][j] = 1;
                        }
                }
        }
        for (int j = 1; j < c; j++)
        {
                int count1 = 0;
                int count0 = 0;
                for (int i = 0; i < r; i++)
                {
                        if (grid[i][j] == 1)
                                count1++;
                        else
                                count0++;
                }
                if (count1 < count0)
                {
                        for (int i = 0; i < r; i++)
                        {
                                if (grid[i][j] == 1)
                                        grid[i][j] = 0;
                                else
                                        grid[i][j] = 1;
                        }
                }
        }
        for (int i = 0; i < r; i++)
        {
                int num = 0;
                int x=0;
                for (int j = c-1; j >= 0; j--,x++)
                {
                        num += grid[i][j] * pow(2, x);
                        cout<<num<<" ";
                }
                cout<<endl;
                score += num;
                cout<<num<<endl;
                cout<<score<<endl;
        }
        return score;
}

int main()
{
        vector<vector<int>> grid = {{0, 0, 1, 1}, {1, 0, 1, 0}, {1, 1, 0, 0}};
        int s = matrixScore(grid);
        cout << s;
        // grid= matrixScore(grid);
        // for (int i = 0; i < 3; i++)
        // {
        //         for (int j = 0; j <= 3; j++)
        //         {
        //                 cout << grid[i] [j] << " ";
        //         }
        //         cout << endl;
        // }
        return 0;
}