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

<style>
/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

</style>