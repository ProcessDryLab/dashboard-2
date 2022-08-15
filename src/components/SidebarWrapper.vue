<template>
  <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse px-0 border-right">
    <div class="sidebar-sticky px-0 mx-0">
      <div style="height: calc(100vh - 80px)">
        <div class="h-75 overflow-auto pb-1">
          <b-nav class="flex-column">
            <b-button variant="outline-secondary" class="mt-3 mx-2"><b-icon icon="cloud-upload" /> Upload file</b-button>
            <b-button variant="outline-secondary" class="mt-1 mx-2"><b-icon icon="gear-wide-connected" /> New mining instance</b-button>
          </b-nav>
          <SidebarResourcesList />
        </div>
        <div class="h-25 overflow-auto border-top">
          <SidebarOperationsList />
        </div>
      </div>
      <SidebarStatusSummary />
    </div>
  </nav>
</template>

<script>
import SidebarResourcesList from './SidebarResourcesList.vue'
import SidebarOperationsList from './SidebarOperationsList.vue'
import SidebarStatusSummary from './SidebarStatusSummary.vue'

export default {
  name: "SidebarWrapper",
  components: {
    SidebarResourcesList,
    SidebarOperationsList,
    SidebarStatusSummary
  }
}
</script>
