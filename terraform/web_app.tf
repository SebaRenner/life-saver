resource "azurerm_service_plan" "asp" {
  name                = "asp-life-saver"
  resource_group_name = azurerm_resource_group.rg.name
  location            = local.location
  os_type             = "Linux"
  sku_name            = "P0v4"
}

resource "azurerm_linux_web_app" "api" {
  name                = "app-life-saver"
  resource_group_name = azurerm_resource_group.rg.name
  location            = local.location
  service_plan_id     = azurerm_service_plan.asp.id

  site_config {
    application_stack {
      dotnet_version = "10.0"
    }
  }
}