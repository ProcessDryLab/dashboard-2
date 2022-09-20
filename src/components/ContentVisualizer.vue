<template>
	<b-col class="col-md-8 col-lg-9 col-xl-10 content-visualizer d-flex flex-column">
		<h1 class="h2 py-3 mb-3 border-bottom">{{ this.resource.name }}</h1>
		<b-tabs content-class="mt-3 flex-fill" class="mt-3 flex-fill d-flex flex-column">
			<b-tab :title="vis.name" class="h-100" v-for="vis in this.resource.type.visualizations" v-bind:key="vis.id">
				<iframe
					class="h-100"
					:src="buildUrl(resource.host, resource.id, vis.id)"
					loading="lazy"
					width="100%"
					frameborder="0"
					v-if="vis.type == 'html'"
				></iframe>
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

export default {
	name: "Contentvisualizer",
	data: () => ({
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
			// this.resource.type.type.visualizations.
			if ("id" in this.$route.params) {
				var results = this.$store.getters.getResource(this.$route.params.id);
				if (results.length == 1) {
					this.$set(this, "resource", results[0]);
					return;
				}
			}
			this.$router.push("/");
		},
	},
	components: { ProcessRenderer },
};
</script>

<style>
.content-visualizer {
	padding: 56px 1rem 1rem 1rem; /* Height of navbar */
}
</style>
