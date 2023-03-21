import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

import { Text, Table } from '@nextui-org/react';
import { TransactionTags } from './tag';
import { useEffect,useState } from 'react';
import { getUserTags } from '../../lib/api_query';
import { deserialize } from 'class-transformer';

export function TrendGraph({ userTransactions }) {
    var summary = 0;
    const data = {
        labels: userTransactions.map(transaction => (transaction.date)),
        datasets: [{
            label: 'Summary',
            lineTension: 0.2,
            data: userTransactions.map(transaction => (
                summary = summary + transaction.amount))
        }],
    };
    const options = {
        plugins: {
            legend: {
                display: true,
            },
        },
        elements: {
            line: {
                tension: 0.1,
                borderWidth: 2,
                borderColor: "rgba(11, 131, 165, 1)",
                fill: "start",
                backgroundColor: "rgba(11,131,165, 0.3)",
            },
        },
    }
    return (
        <Line data={data} options={options} />
    )
}
export function TransactionsTabel({ userTransactions, userId }) {

    const [userTags, setUserTags] = useState([])

    class userTag{
        tag_id = 0;
        tag_name= "";
    }

    useEffect(() => {
        async function awaitUserGetTags() {
            const userTagsJson = await getUserTags(userId)
            setUserTags(deserialize(userTag, JSON.stringify(userTagsJson)))
        }
        awaitUserGetTags()
    }, [])

    return (
        <>
            <Table
                bordered
                shadow={false}
                color="secondary"
                aria-label="Transactions"
                css={{

                }}>
                <Table.Header>
                    <Table.Column scope="col">Amount</Table.Column>
                    <Table.Column scope="col">Date</Table.Column>
                    <Table.Column scope="col">Description</Table.Column>
                    <Table.Column scope="col">Tag</Table.Column>
                </Table.Header>
                <Table.Body>
                    {userTransactions.map(transaction => (
                        <Table.Row>
                            <Table.Cell>{transaction.amount}</Table.Cell>
                            <Table.Cell>{transaction.date}</Table.Cell>
                            <Table.Cell>{transaction.description}</Table.Cell>
                            <Table.Cell><TransactionTags tagName={transaction.tag_name} userTags={userTags}/></Table.Cell>
                        </Table.Row>
                        
                    ))}
                </Table.Body>
                <Table.Pagination
                    align="center"
                    rowsPerPage={7}
                    onPageChange={(page) => console.log({ page })}
                >

                </Table.Pagination>
            </Table>
        </>
    )
}
export function Saldo({ userTransactions }) {
    function sumSaldo() {
        var x = 0
        userTransactions.map(transaction => (x = x + transaction.amount))
        return x
    }
    return (
        <Text
            h2
            css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold">Saldo totale {sumSaldo()}€
        </Text>
    )
}