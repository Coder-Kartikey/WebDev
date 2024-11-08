#include <iostream>
#include <vector>
#include <math.h>
using namespace std;

void print(vector <vector<int>> matrix){
        int r=matrix.size();
        int c=matrix[0].size();
        for (int i=0; i<r; i++)
        {
                for (int j = 0; j < c; j++)
                {
                        if(i==j || j==r-i-1){
                                cout<<matrix[i][j]<<" ";
                        }
                        else cout<<" "<<" ";
                }
                cout<<endl;
        }
}

int main()
{
        vector<vector<int>> grid = {{0, 1, 2, 3, 1}, {4, 5, 6, 7, 2}, {8, 9, 0, 1, 3}, {2, 3, 4, 5, 4}, {6, 7, 8, 9, 5}};
        print(grid);
        cout<<endl;
        // for (int i = 0; i <= 4; i++)
        // {
        //         for (int j = 0; j <= 4; j++)
        //         {
        //                 cout << grid[i] [j] << " ";
        //         }
        //         cout << endl;
        // }
        return 0;
}