<template>
	<b-col class="col-md-8 col-lg-9 col-xl-10 content-visualizer d-flex flex-column">
		<h1 class="h2 py-3 mb-3 border-bottom">
			<b-button
				variant="text-secondary"
				style="float: right; font-size: 0.5em"
				class="m-0 py-0 px-1"
				@click="deleteEntry({ id: resource.id, host: resource.host, name: resource.name })"
			>
				<b-icon icon="trash" />
			</b-button>
			{{ this.resource.name }}
		</h1>
		<b-tabs content-class="mt-3 flex-fill" class="mt-3 flex-fill d-flex flex-column">
			<b-tab :title="vis.name" class="h-100" v-for="vis in this.resource.type.visualizations" v-bind:key="vis.id">
				<div class="h-100" style="position: relative" v-if="vis.type == 'html'">
					<div class="loading-iframe" v-if="iframeLoading"></div>
					<iframe
						class="h-100"
						:src="buildUrl(resource.host, resource.id, vis.id)"
						width="100%"
						frameborder="0"
						@load="iframeLoaded"
					></iframe>
				</div>
				<ProcessRenderer
					class="h-100"
					v-if="vis.type == 'graphviz'"
					:dotUrl="buildUrl(resource.host, resource.id, vis.id)"
				/>
			</b-tab>
		</b-tabs>
	</b-col>
</template>

<script>
import { RepositoryService } from "../services/repository";
import ProcessRenderer from "../widgets/ProcessRenderer.vue";
import axios from "axios";

export default {
	name: "Contentvisualizer",
	components: { ProcessRenderer },
	data: () => ({
		iframeLoading: true,
		resource: {
			id: null,
			host: null,
			type: {
				visualizations: [],
			},
		},
	}),
	created() {
		this.updateId();
	},
	watch: {
		$route: "updateId",
	},
	methods: {
		buildUrl(host, resourceId, visualizationId) {
			return RepositoryService.buildResourceVisualization(host, resourceId, visualizationId);
		},
		updateId() {
			if ("id" in this.$route.params) {
				this.$set(this, "iframeLoading", true);
				var results = this.$store.getters.getResource(this.$route.params.id);
				if (results.length == 1) {
					this.$set(this, "resource", results[0]);
					return;
				}
			}
			this.$router.push("/");
		},
		iframeLoaded() {
			this.$set(this, "iframeLoading", false);
		},
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
			this.$router.push("/");
		},
	},
};
</script>

<style>
.content-visualizer {
	padding: 56px 1rem 1rem 1rem; /* Height of navbar */
}
.loading-iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: white url("../assets/loader.svg") center center no-repeat !important;
}
</style>
