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
				href="#"
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
			>
				<b-badge variant="light" class="text-uppercase border border-secondary mr-1">
					{{ resource.type.name }}
				</b-badge>
				<span :title="resource.name">{{ resource.name }}</span>

				<b-button
					variant="text-secondary"
					style="float: right; font-size: 0.85em"
					class="m-0 py-0 px-1"
					@click="deleteEntry({ id: resource.id, host: resource.host, name: resource.name })"
				>
					<b-icon icon="trash" />
				</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import { RepositoryService } from "../services/repository";
import axios from "axios";

export default {
	name: "SidebarResourcesList",
	methods: {
		deleteEntry(e) {
			axios.delete(RepositoryService.deleteResource(e.host, e.id)).then(() => {
				this.$bvToast.toast('File "' + e.name + '" deleted correctly', {
					title: "Deletion complete",
					variant: "success",
					solid: true,
				});
				this.$store.commit("addOperation", {
					title: "Deletion complete",
					description: 'File "' + e.name + '" deleted correctly',
					host: e.host,
					type: "repository",
				});
			});
		},
	},
};
</script>
