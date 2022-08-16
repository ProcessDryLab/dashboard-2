<template>
	<div class="pl-3 pt-1 pb-1 small bg-light border-top" style="height: 30px">
		<b-icon icon="circle-fill" :class="this.status" /> {{ message }}
	</div>
</template>

<script>
export default {
	name: "SidebarStatusSummary",
	computed: {
		status() {
			var status = "online";
			for (const item of this.$store.getters.getHostsMiner.concat(this.$store.getters.getHostsRepository)) {
				if (item.status === "offline") {
					status = "offline";
					break;
				}
				if (item.status === "loading") {
					status = "loading";
				}
			}
			return status;
		},
		message() {
			const status = this.status;
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
