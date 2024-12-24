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

void push(Node** root, int data){
        Node* newNode = *root;
        newNode->next=*root;
        *root = newNode;
        printf("%d pushed", data);
}

int pop(Node** root){
        Node* temp = *root;
        *root = (*root)->next;
        int popped = temp->data;
        free(temp);
        return popped;
}