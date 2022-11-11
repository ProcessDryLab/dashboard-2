<template>
	<div>
		<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-3 text-muted">
			Performed Actions
		</h6>
		<p class="text-muted text-center pt-3" v-if="this.$store.getters.getOperations.length == 0">
			<em>No actions to report</em>
		</p>
		<ul class="list-unstyled operations-list">
			<b-media
				no-body
				tag="li"
				class="mb-2 pl-3"
				v-for="resource in this.$store.getters.getOperations"
				v-bind:key="resource.started"
			>
				<b-media>
					<template #aside class="mr-0">
						<b-icon icon="gear-wide-connected" class="feather" v-if="resource.type == 'miner'" />
						<b-icon icon="cloud-upload" class="feather" v-if="resource.type == 'repository'" />
					</template>
				</b-media>
				<b-media-body
					style="white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis !important"
				>
					<span class="font-weight-bold" style="white-space: normal"> {{ resource.title }}</span>
					<br />
					<span class="text-muted">
						Execution:
						<span :title="resource.started | moment('dddd, MMMM Do YYYY HH:mm')">{{
							resource.started | moment("from", "now")
						}}</span
						><br />
						<span v-if="resource.completed != null">
							Completed: {{ resource.started | moment("from", "now") }}<br />
						</span>
						Host: <tt :title="resource.host">{{ resource.host }}</tt>
					</span>
				</b-media-body>
			</b-media>
		</ul>
	</div>
</template>

<script>
export default {
	name: "SidebarActionsList",
};
</script>

<style>
.operations-list {
	font-size: 0.8rem;
}
.operations-list .media-aside {
	margin-right: 0.5em !important;
}
</style>
