locals {
  location = "switzerlandnorth"
  stapp_location = "westeurope"
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-life-saver"
  location = local.location
}