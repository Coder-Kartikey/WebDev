//maximum-possible-number-by-binary-concatenation
class Solution {
public:
    int toBinary(int num) {
        // string binary = "";
        int n=num;
        int binary = 0;
        while (num > 0) {
            binary = (n % 2 == 0 ? 0 : 1) + binary;
            n /= 2;
        }
        return binary;
    }
    bool containsZero(int number) {
        std::string numStr = std::to_string(number);
        return numStr.find('0');
    }
    int binaryToDecimal(int n) {
        int decimalNumber = 0, i = 0, remainder;

        while (n != 0) {
            remainder = n % 10;
            n /= 10;
            decimalNumber += remainder * pow(2, i);
            ++i;
        }
        return decimalNumber;
    }
    int maxGoodNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        reverse(nums.begin(), nums.end());
        string s = "";
        for (int i = 1; i <= nums.size(); i++) {
            int bi = toBinary(nums[i - 1]);
            int bi1 = toBinary(nums[i]);
            if (containsZero(bi) && containsZero(bi1)) {
                if (nums[i] > nums[i - 1]) {
                    int temp = nums[i];
                    nums[i] = nums[i - 1];
                    nums[i - 1] = temp;
                }
            } else if (containsZero(bi) || containsZero(bi1)) {
                if (containsZero(bi)) {
                    int temp = nums[i];
                    nums[i] = nums[i - 1];
                    nums[i - 1] = temp;
                }
            }
            s = s + to_string(bi);
        }
        int num = stoi(s);
        return binaryToDecimal(num);
    }
};


// test case [1,2,3] , 30
// test case [2,8,16], 1296