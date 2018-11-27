const abi=[
	{
		"constant": true,
		"inputs": [],
		"name": "getVal",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
]
module.exports=abi;

