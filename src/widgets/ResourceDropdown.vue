<template>
	<b-dropdown
		:text="this.resource == undefined ? 'Select resource' : 'Selected resource: ' + this.resource.name"
		block
		variant="outline-secondary"
	>
		<b-dropdown-item
			v-bind:key="r.id"
			v-for="r in this.$store.getters.getResourcesByType(this.type)"
			style="font-size: 0.85em"
			@click="
				resource = r;
				$emit('selected', r);
			"
		>
			<b-badge variant="light" class="text-uppercase border border-secondary mr-1">
				{{ r.type.name }}
			</b-badge>
			{{ r.name }}<br />
			<small>
				<code>{{ r.host }}</code>
			</small>
		</b-dropdown-item>
	</b-dropdown>
</template>

<script>
export default {
	name: "ResourceDropdown",
	props: ["type", "current"],
	data() {
		return {
			resource: undefined,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.resource = this.current;
		});
	},
};
</script>
