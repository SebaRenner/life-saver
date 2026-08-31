locals {
  location = "switzerlandnorth"
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-life-saver"
  location = local.location
}