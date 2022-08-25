<template>
	<div>
		<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			Workspace Entries
		</h6>
		<b-nav class="flex-column">
			<b-nav-item href="#" v-for="resource in this.$store.getters.getWorkspace" v-bind:key="resource.id">
				<b-icon icon="file-text" class="feather" /> {{ resource.name }}
				<b-badge variant="secondary" style="float: right">{{ resource.type.name }}</b-badge>
			</b-nav-item>
		</b-nav>
	</div>
</template>

<script>
export default {
	name: "SidebarResourcesList",
};
</script>
