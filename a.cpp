#include <iostream>
#include <vector>
#include <string>
#include<algorithm>
using namespace std;

int getOperations(string s) {
        // code here
        int count;
        sort(s.begin(),s.end());
        for(int i=0; i<(s.size()-2); i++){
            if(s[i]==s[i+1] && s[i+1]==s[i+2]){
                count++;
                s.erase(i,3);
                i--;
                cout<<count<<endl;
            }
        }
        return count;
}

int main(){
    string s="abdbbeghege";
    cout<< getOperations(s);
    return 0;
}