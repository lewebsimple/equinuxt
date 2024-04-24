<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar :ui="{ left: 'flex-1' }">
        <template #left>
          <AppLogo />
        </template>
      </UDashboardNavbar>
      <UDashboardSidebar>
        <AdminSidebarLinks />
        <div class="flex-1" />
        <UDivider class="sticky bottom-0" />
        <template #footer>
          <AdminSidebarUserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>
    <slot />
  </UDashboardLayout>
</template>
