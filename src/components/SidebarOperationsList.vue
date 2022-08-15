<template>
  <div>
    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-3 text-muted">Operations instances</h6>
    <ul class="list-unstyled operations-list">
      <b-media tag="li" class="mb-2 pl-3">
        <template #aside class="mr-0">
          <b-icon icon="gear-wide-connected" class="feather" />
        </template>
        <span class="font-weight-bold">Mine DCR model with support for noise and unfrequent behavior</span><br/>
        <span class="text-muted">Started: 5 minutes ago<br/>
        Completed: ...<br/>
        Host: <tt>miner1.pdl.com</tt></span>
      </b-media>
      <b-media tag="li" class="mb-2 pl-3">
        <template #aside>
          <b-icon icon="gear-wide-connected" class="feather" />
        </template>
        <span class="font-weight-bold">Mine DCR model with DisCoveR</span><br/>
        <span class="text-muted">Started: 15 minutes ago<br/>
        Completed: 10 minutes ago<br/>
        Host: <tt>miner1.pdl.com</tt></span>
      </b-media>
      <b-media tag="li" class="mb-2 pl-3">
        <template #aside>
          <b-icon icon="gear-wide-connected" class="feather" />
        </template>
        <span class="font-weight-bold">Conformance checking</span><br/>
        <span class="text-muted">Started: 25 minutes ago<br/>
        Completed: 20 minutes ago<br/>
        Host: <tt>miner1.pdl.com</tt></span>
      </b-media>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SidebarOperationsList"
}
</script>

<style>
.operations-list {
  font-size: .8rem;
}
.operations-list  .media-aside {
  margin-right: .5em !important;
}
</style>