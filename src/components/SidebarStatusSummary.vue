<template>
	<div class="pl-3 pt-1 pb-1 small bg-light border-top" style="height: 30px">
		<b-icon icon="circle-fill" :class="this.$store.getters.getSystemStatus" /> {{ message }}
	</div>
</template>

<script>
export default {
	name: "SidebarStatusSummary",
	computed: {
		message() {
			const status = this.$store.getters.getSystemStatus;
			var msg = "All systems are online";
			if (status === "offline") msg = "Some systems are offline";
			if (status === "loading") msg = "Some systems are loading";
			return msg;
		},
	},
};
</script>

<style scoped>
div {
	font-size: 0.75em;
}

.online {
	color: #28a745;
}
.loading {
	color: #cc9a06;
	animation: 0.75s infinite ease-in-out alternate b-icon-animation-fade;
}
.offline {
	color: #b02a37;
}
</style>
