#!/usr/bin/env bash
# Requires Azure CLI (https://learn.microsoft.com/en-us/cli/azure/) to be installed.
set -euo pipefail

read -rp "Enter the Azure Subscription ID: " SUBSCRIPTION_ID
read -rp "Enter the Storage Account Name: " STORAGE_ACCOUNT_NAME
read -rp "Enter the Container Name: " CONTAINER_NAME
read -rp "Enter the TFState Name: " TFSTATE_NAME
read -rp "Enter the Resource Group Name: " RESOURCE_GROUP_NAME

az login --use-device-code
az account set --subscription "$SUBSCRIPTION_ID"

terraform init "-backend-config=subscription_id=$SUBSCRIPTION_ID" \
               "-backend-config=storage_account_name=$STORAGE_ACCOUNT_NAME" \
               "-backend-config=container_name=$CONTAINER_NAME" \
               "-backend-config=key=$TFSTATE_NAME" \
               "-backend-config=resource_group_name=$RESOURCE_GROUP_NAME"