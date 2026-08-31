resource "azurerm_static_web_app" "app" {
  name                = "stapp-life-saver"
  resource_group_name = azurerm_resource_group.rg.name
  location            = local.location

  sku_tier = "Free"
  sku_size = "Free"
}