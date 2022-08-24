<template>
	<b-sidebar id="sidebar-1" title="Hosts configuration" shadow backdrop visible>
		<div class="px-3 py-2">
			<h5 class="mb-3">Repositories</h5>
			<b-list-group>
				<b-list-group-item
					v-for="item in this.$store.getters.getHostsRepository"
					v-bind:key="item.name"
					class="pl-3"
					:class="item.status"
				>
					<b-icon icon="hdd-fill" />
					<code class="text-dark ml-2">{{ item.name }}</code>
					<b-button
						variant="link"
						class="float-right p-0 text-secondary"
						style="font-size: 0.75em"
						@click="deleteEntry({ type: 'repository', name: item.name })"
					>
						<b-icon icon="trash" />
					</b-button>
				</b-list-group-item>
			</b-list-group>

			<h5 class="mt-4 mb-3">Miners</h5>
			<b-list-group>
				<b-list-group-item
					v-for="item in this.$store.getters.getHostsMiner"
					v-bind:key="item.name"
					class="pl-3"
					:class="item.status"
				>
					<b-icon icon="gear-fill" />
					<code class="text-dark ml-2">{{ item.name }}</code>
					<b-button
						variant="link"
						class="float-right p-0 text-secondary"
						style="font-size: 0.75em"
						@click="deleteEntry({ type: 'miner', name: item.name })"
					>
						<b-icon icon="trash" />
					</b-button>
				</b-list-group-item>
			</b-list-group>

			<div class="btn-group fixed-bottom px-3 py-2" role="group">
				<button type="button" class="btn btn-primary" v-b-modal.new-host-modal>Add new host</button>
			</div>
		</div>

		<NewHostModal />
	</b-sidebar>
</template>

<script>
import NewHostModal from "../modals/NewHostModal.vue";

export default {
	name: "SidebarHosts",
	components: {
		NewHostModal,
	},
	methods: {
		deleteEntry(e) {
			this.$store.hosts.commit("removeHost", e);
		},
	},
};
</script>

<style scoped>
.online > svg {
	color: #28a745;
}
.loading > svg {
	color: #cc9a06;
	animation: 0.75s infinite ease-in-out alternate b-icon-animation-fade;
}
.offline > svg {
	color: #b02a37;
}
.offline code {
	text-decoration: line-through;
}
</style>
