import {
    TextField,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@mui/material";


const JsonRenderer = ({
    schema,
    formData,
    clients,
    errors,
    onInputChange
}) => {

    return (

        <>

            {schema.map((node, index) => {


                // HTML node
                if (node.type === "html") {

                    return (

                        <Typography
                            key={index}
                            variant="h4"
                            sx={{
                                mb: 3,
                                fontWeight: "bold"
                            }}
                        >

                            {node.value}

                        </Typography>

                    );

                }


                // INPUT node
                if (node.type === "input") {

                    return (

                        <TextField
                            key={index}
                            fullWidth
                            margin="normal"
                            name={node.name}
                            label={node.label}
                            required={node.required}
                            value={
                                formData[node.name] || ""
                            }
                            onChange={onInputChange}
                            error={
                                Boolean(
                                    errors[node.name]
                                )
                            }
                            helperText={
                                errors[node.name] || ""
                            }
                        />

                    );

                }


                // TABLE node
                if (node.type === "table") {

                    return (

                        <Table
                            key={index}
                            sx={{ mt: 4 }}
                        >

                            <TableHead>

                                <TableRow>

                                    {node.columns.map(
                                        (column) => (

                                            <TableCell
                                                key={
                                                    column.key
                                                }
                                            >

                                                <strong>
                                                    {
                                                        column.label
                                                    }
                                                </strong>

                                            </TableCell>

                                        )
                                    )}

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {clients.length === 0 ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={
                                                node.columns
                                                    .length
                                            }
                                            align="center"
                                        >

                                            No clients found

                                        </TableCell>

                                    </TableRow>

                                ) : (

                                    clients.map(
                                        (client) => (

                                            <TableRow
                                                key={
                                                    client._id
                                                }
                                            >

                                                {node.columns.map(
                                                    (column) => (

                                                        <TableCell
                                                            key={
                                                                column.key
                                                            }
                                                        >

                                                            {
                                                                client[
                                                                    column.key
                                                                ]
                                                            }

                                                        </TableCell>

                                                    )
                                                )}

                                            </TableRow>

                                        )
                                    )

                                )}

                            </TableBody>

                        </Table>

                    );

                }


                return null;

            })}

        </>

    );

};


export default JsonRenderer;