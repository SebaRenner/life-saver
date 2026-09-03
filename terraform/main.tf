locals {
  location = "switzerlandnorth"
  stapp_location = "eastus2"
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-life-saver"
  location = local.location
}