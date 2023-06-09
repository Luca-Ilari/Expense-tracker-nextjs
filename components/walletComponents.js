import { Text, Table } from '@nextui-org/react';
import { Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import EditTransactionTagDropdown from './editTransactionTag/index';
import EditableText from './EditableText';

export function TransactionsTabel({ userTransactions, userTags }) {
    function updateTransaction(text, id) {
        console.log(text)
        console.log(id)
        //call api to change desc
    }

    return (
        <>
            <Table
                bordered
                shadow={false}
                color="secondary"
                style={{width: '800px'}}
                aria-label="Transactions"
            >
                <Table.Header>
                    <Table.Column scope="col">Amount</Table.Column>
                    <Table.Column scope="col">Date</Table.Column>
                    <Table.Column scope="col">Description</Table.Column>
                    <Table.Column scope="col">Tag</Table.Column>
                </Table.Header>
                <Table.Body>
                    {userTransactions.map((transaction, index) => (
                        <Table.Row key={index}>
                            {transaction.amount > 0 ? (
                                <Table.Cell key="amount">
                                    <Statistic
                                        value={transaction.amount}
                                        precision={2}
                                        valueStyle={{
                                            color: '#3f8600',
                                            fontSize: '15px',
                                        }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="€"
                                    />
                                </Table.Cell>
                            ) : (
                                <Table.Cell key="amount">
                                    <Statistic
                                        value={transaction.amount}
                                        precision={2}
                                        valueStyle={{
                                            fontSize: '15px',
                                            color: '#cf1322',
                                        }}
                                        prefix={<ArrowDownOutlined />}
                                        suffix="€"
                                    />
                                </Table.Cell>
                            )}
                            <Table.Cell key="date">{transaction.date}</Table.Cell>
                            <Table.Cell><EditableText callback={(text) => updateTransaction(text, transaction.transaction_id)} maxLength={30}>{transaction.description}</EditableText></Table.Cell>
                            <Table.Cell key="tags"><EditTransactionTagDropdown transactionId={transaction.transaction_id} initialTag={transaction.tag_name} initialTagId={transaction.tag_id} userTags={userTags} /></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Pagination
                    align="center"
                    rowsPerPage={6}
                    onPageChange={(page) => console.log({ page })}
                >
                </Table.Pagination>
            </Table>
        </>
    )
}
export function Balance({ userTransactions }) {
    function sumBalance() {
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
            weight="bold">Balance {sumBalance()}€
        </Text>
    )
}