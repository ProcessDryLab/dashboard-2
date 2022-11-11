<template>
	<div>
		<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			Workspace Entries
		</h6>
		<p class="text-muted text-center pt-3" v-if="this.$store.getters.getWorkspace.length == 0">
			<em>No entries yet</em>
		</p>
		<b-list-group flush class="border-top border-bottom" v-if="this.$store.getters.getWorkspace.length > 0">
			<b-list-group-item
				v-for="resource in this.$store.getters.getWorkspace"
				v-bind:key="resource.id"
				class="pl-2 pr-2"
				style="
					width: 100%;
					font-size: 0.85em;
					white-space: nowrap;
					overflow: hidden !important;
					text-overflow: ellipsis !important;
				"
				:to="{ name: 'ContentVisualizer', params: { id: resource.id } }"
			>
				<b-badge variant="light" class="text-uppercase border border-secondary mr-1">
					{{ resource.type.name }}
				</b-badge>
				<b-badge
					variant="success"
					class="text-uppercase border border-success mr-1 float-right"
					v-if="(new Date() - new Date(resource.creationDate)) / 1000 < 15"
				>
					new
				</b-badge>
				<span :title="resource.name">{{ resource.name }}</span>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
export default {
	name: "SidebarResourcesList",
};
</script>
