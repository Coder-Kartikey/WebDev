#include <iostream>
#include <vector>
using namespace std;

// vector<vector<int>> generate(int numRows)
// {
//         vector<vector<int>> v;
//         for (int i = 0; i < numRows; i++)
//         {
//                 v.push_back(vector <int> (i+1));
//                 for (int j = 0; j < i+1; j++)
//                 {
//                         if (j==0 || j==i){
//                                 v[i] [j]=1;
//                         }
//                         else{
//                                 v[i] [j] = v[i - 1] [j] + v[i - 1] [j - 1];
//                         }
//                 }
//         }
//         return v;
// }

vector<int> getRow(int rowIndex) {
        if (rowIndex == 0) {
            vector<int> n1(1, 1);
            return n1;
        } else if (rowIndex == 1) {
            vector<int> n(2, 1);
            return n;
        } else {
            vector<int> n1(2,1);
            for (int i = 2; i < rowIndex; i++) {
                vector<int> n(1, 1);
                for (int j=1; j<i; j++){
                    int ans=n1[j] + n1[j-1];
                    n.push_back(ans);
                }
                n.push_back(1);
                n1=n;
            }
            return n1;
        }
    }

int main()
{
        // int numRows = 5;
        // vector<vector<int>> v;
        // v = generate(numRows);
        // for (int i = 0; i < numRows; i++)
        // {
        //         for (int j = 0; j <= i; j++)
        //         {
        //                 cout << v[i] [j] << " ";
        //         }
        //         cout << endl;
        // }

        int rowIndex=5;
        vector<int> v;
        v= getRow(rowIndex);
        for (int i = 0; i < rowIndex; i++)
        {
                cout<<v[i]<<" ";
        }
        return 0;
}