#include<stdio.h>
#include<iostream>
#include<vector>

using namespace std;

int last_occurance(vector <int> arr,int x)
{
        int low=0;
        int high=arr.size()-1;
        int mid=(low+high)/2;
        while(low<=high){
                mid=(low+high)/2;
                if(arr[mid]==x && arr[mid+1]!=x) return mid; 
                else if(arr[mid]<=x) low=mid+1;
                else high =mid-1;
        }
        return high;
}

int ones(vector<int> arr)
{
        int low=0;
        int high=arr.size()-1;
        int mid=(low+high)/2;
        while(low<=high){
                mid=(low+high)/2;
                if(arr[mid]==1 && arr[mid-1]==0) return arr.size()-mid;
                else if(arr[mid]<=0) low=mid+1;
                else high =mid-1;
        }
        return arr.size()-high;
}

int repeated_number(vector<int> arr)
{
        int low=0;
        int high=arr.size()-1;
        int mid=(low+high)/2;
        while(low<=high){
                mid=(low+high)/2;
                if((arr[mid]==arr[mid-1]) || (arr[mid]==arr[mid+1])) return arr[mid];
                else if(arr[mid]==mid+1) low=mid+1;
                else high =mid-1;
        }
        return arr[high];
}

string perfect_squre(int n)
{
        int low=0;
        int high=n;
        int mid=(low+high)/2;
        while(low<=high){
                mid=(low+high)/2;
                if(mid*mid==n) return "yes";
                else if(mid*mid<n) low=mid+1;
                else high =mid-1;
        }
        return "no";
}

vector<int> searchRange(vector<int>& arr, int x) {
        int start=-1;
        int low=0;
        int high=arr.size()-1;
        int mid;
        //start
        while(low<=high){
                mid=low+(high-low)/2;
                if(arr[mid]==x){
                    if(mid==0 || arr[mid-1]!=x){
                        start=mid;
                        break;
                    }
                    else high=mid-1;
                }
                if(arr[mid]<=x) low=mid+1;
                else high=mid-1;
        }
        //end
        int end=-1;
        low=0;
        high=arr.size()-1;
        while(low<=high){
                mid=low+(high-low)/2;
                if(mid==(arr.size()-1) || arr[mid]==x){
                    if(arr[mid+1]!=x){
                        end=mid;
                        break;
                    }
                    else low=mid+1;
                }
                if(arr[mid]<=x) low=mid+1;
                else high=mid-1;
        }
        end=low;
        arr.clear();
        arr.push_back(start);
        arr.push_back(end);
        return arr;
    }

int main()
{
        // vector <int> arr={1,2,3,3,4,4,4,4,4,4,4,4,4,5};
        // int x=3;
        // cout << last_occurance(arr,x);
        
        // vector<int> arr={0,0,0,0,0,1,1,1,1};
        // cout<< ones(arr);

        // vector<int> arr={1,1,2,3,4,5,6};
        // cout<< repeated_number(arr);

        // int x=45;
        // cout<< perfect_squre(x);

        // vector<int> arr={5,7,7,8,8,10};
        // int x=8;
        // arr.clear();
        // arr=searchRange(arr, x);
        // cout<<arr[0]<<" \n"<<arr[1]<<endl;
        return 0;
}
