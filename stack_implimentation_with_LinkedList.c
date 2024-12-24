#include<stdio.h>
#include<stdlib.h>

typedef struct Node
{
        int data;
        struct Node* next;
}Node;

Node* createNode(int data){
        Node* newNode = (Node*)malloc(sizeof(Node));
        newNode->data = data;
        newNode->next = NULL;
        return newNode;
}

int isEmpty(Node* root){
        return !root;
}

void push(Node** root , int data){
        Node* newNode = createNode(data);
        newNode->next = *root;
        *root = newNode;
        printf("%d data pushed\n", data);
}

int pop(Node** root){
        if(isEmpty(*root)){
                printf("Stack is Empty\n");
                return -1;
        }
        Node* temp = *root;
        *root = (*root)->next;
        int popped = temp->data;
        free(temp);
        return popped;
}

int main(){
        Node* root = NULL;
        push(&root,10);
        push(&root,20);
        printf("%d popped\n", pop(&root));
        push(&root,30);
        push(&root,40);
        printf("%d popped\n", pop(&root));
}