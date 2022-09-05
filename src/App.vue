<template>
	<div id="app">
		<Navbar />
		<SidebarHosts />

		<b-container fluid>
			<b-row>
				<SidebarWrapper />
				<router-view />
			</b-row>
		</b-container>
	</div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import SidebarHosts from "./components/SidebarHosts.vue";
import SidebarWrapper from "./components/SidebarWrapper.vue";

export default {
	name: "App",
	components: {
		Navbar,
		SidebarHosts,
		SidebarWrapper,
	},
	mounted() {
		this.$store.dispatch("checkHosts");
		this.$store.dispatch("checkWorkspaces");
	},
};
</script>

<style></style>
