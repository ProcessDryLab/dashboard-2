<template>
  <div id="app">
    <Navbar />
    <SidebarHosts />

    <b-container fluid>
      <b-row>
          <SidebarWrapper />


          <!-- <main class="col col-md-9 ml-sm-auto col-lg-10 px-md-4" style="background-color: yellow">
          !-- <b-col class="" style="background-color: yellow"> --
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>

          !-- </b-col> --
          </main> -->
      </b-row>
    </b-container>
  
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import SidebarHosts from './components/SidebarHosts.vue'
import SidebarWrapper from './components/SidebarWrapper.vue'

export default {
  name: "App",
  components: {
    Navbar,
    SidebarHosts,
    SidebarWrapper
  }
}
</script>


<style>
html,body {
  font-size: .875rem;
}


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

.operations-list {
  font-size: .8rem;
}
.operations-list  .media-aside {
  margin-right: .5em !important;
}
</style>
