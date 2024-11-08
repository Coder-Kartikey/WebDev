// #include <iostream>
// #include <vector>
// #include <map>
// #include <algorithm>
// using namespace std;


// int isPossible(int n, vector<int> &arr) {
//         // code here
//         int j;
//         int iMul=1;
//         int jMul=1;
//         for(int i=0; i<arr.size(); i++){
//             jMul*=arr[i];
//         }
//         for(int i=0; i<arr.size()-1; i++){
//             j=i+1;
//             iMul=iMul*arr[i];
//             jMul=jMul/arr[j];
//             int iZero=0, jZero=0;
//             int iCopy=iMul, jCopy=jMul;
//             while(iCopy>-1){
//                 if(iCopy%10==0){
//                     iZero++;
//                     iCopy/=10;
//                 }
//                 else break;
//             }
//             while(jCopy>-1){
//                 if(jCopy%10==0){
//                     jZero++;
//                     jCopy/=10;
//                 }
//                 else break;
//             }
//             if(iZero==jZero) return 1;
//         }
//         return 0;
//     }

// int main(){
//     vector<int> arr={45,30, 20, 20};
//     cout<<isPossible(4,arr);
//     return 0;
// }

#include <iostream>
#include <vector>
using namespace std;

pair<int, int> countFactors(int num, int factor) {
    int count = 0;
    while (num % factor == 0 && num > 0) {
        num /= factor;
        count++;
    }
    return {count, num};
}

int isPossible(int n, vector<int>& arr) {
    vector<int> twos(n, 0), fives(n, 0);

    for (int i = 0; i < n; ++i) {
        auto [count2, remaining] = countFactors(arr[i], 2);
        twos[i] = count2;
        auto [count5, _] = countFactors(remaining, 5);
        fives[i] = count5;
    }

    int totalTwos = 0, totalFives = 0;
    for (int i = 0; i < n; ++i) {
        totalTwos += twos[i];
        totalFives += fives[i];
    }

    int leftTwos = 0, leftFives = 0;
    for (int i = 0; i < n - 1; ++i) {
        leftTwos += twos[i];
        leftFives += fives[i];
        totalTwos -= twos[i];
        totalFives -= fives[i];

        if (leftTwos == totalTwos && leftFives == totalFives) {
            return 1;
        }
    }

    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; ++i) {
        cin >> arr[i];
    }
    cout << isPossible(n, arr) << endl;
    return 0;
}
