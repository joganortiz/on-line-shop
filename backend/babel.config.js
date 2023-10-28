module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					node: "current"
				}
			}
		],
		"@babel/preset-typescript"
	],
	plugins: [
		[
			"module-resolver",
			{
				alias: {
					"@apps": "./src/apps",
					"@contexts": "./src/contexts",
					"@mooc": "./src/contexts/mooc",
					"@shared": "./src/contexts/shared"
				}
			}
		],
		["@babel/plugin-proposal-decorators", { "legacy": true }],
		["@babel/plugin-proposal-class-properties", { "loose": true }]
	]
};