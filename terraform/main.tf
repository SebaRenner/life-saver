locals {
  location = "switzerlandnorth"
  stapp_location = "eastus"
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-life-saver"
  location = local.location
}