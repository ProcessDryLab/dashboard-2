<template>
	<b-sidebar id="sidebar-1" title="Hosts configuration" shadow backdrop>
		<div class="px-3 py-2">
			<h5 class="mb-3">Repositories</h5>
			<b-list-group>
				<b-list-group-item class="pl-3">
					<b-icon icon="hdd-fill" style="color: #28a745" /> <tt>repository1.pdl.com</tt>
				</b-list-group-item>
				<b-list-group-item class="pl-3">
					<b-icon icon="hdd-fill" animation="fade" style="color: #bf920d" /> <tt>repository2.pdl.com</tt>
				</b-list-group-item>
			</b-list-group>

			<h5 class="mt-4 mb-3">Miners</h5>
			<b-list-group>
				<b-list-group-item class="pl-3">
					<b-icon icon="gear-fill" style="color: #28a745" /> <tt>miner1.pdl.com</tt>
				</b-list-group-item>
				<b-list-group-item class="pl-3">
					<b-icon icon="gear-fill" animation="fade" style="color: #bf920d" /> <tt>miner2.pdl.com</tt>
				</b-list-group-item>
				<b-list-group-item class="pl-3">
					<b-icon icon="gear-fill" style="color: #28a745" /> <tt>miner3.pdl.com</tt>
				</b-list-group-item>
			</b-list-group>

			<div class="btn-group fixed-bottom px-3 py-2" role="group">
				<button type="button" class="btn btn-primary"><b-icon icon="hdd-fill" /> Add repository</button>
				<button type="button" class="btn btn-primary"><b-icon icon="gear-fill" /> Add miner</button>
			</div>
		</div>
	</b-sidebar>
</template>

<script>
export default {
	name: "SidebarHosts",
};
</script>
