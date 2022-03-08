import { Table, TableCellCoinName, Text } from '..';
import useMediaQuery from '../../hooks/useMediaQuery';

const TableYourAssets = ({ assets }) => {
	let isWidthMin800 = useMediaQuery('(min-width: 800px)');

	return (
		<Table>
			{isWidthMin800 && (
				<thead>
					<tr>
						<th>Name</th>
						<th>Ballance</th>
						<th>Price</th>
						<th>Allocation</th>
					</tr>
				</thead>
			)}
			<tbody>
				{assets.map((asset) => (
					<tr key={asset.symbol}>
						<td>
							<TableCellCoinName
								icon={asset.icon}
								name={asset.name}
								symbol={asset.symbol}
							/>
						</td>
						<td>
							<Text>{`€${asset.balance_eur.toLocaleString()}`}</Text>
							<Text color="grey" size="s">
								{`${asset.balance_coin} ${asset.symbol}`}
							</Text>
						</td>
						{isWidthMin800 && (
							<td>
								<Text>{`€${asset.price_eur.toLocaleString()}`}</Text>
								<Text
									size="s"
									color={asset.price_change24h < 0 ? 'red' : 'green'}>
									{asset.price_change24h}%
								</Text>
							</td>
						)}
						{isWidthMin800 && (
							<td>
								<Text>{asset.allocation}%</Text>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default TableYourAssets;
