COPY (
SELECT row_to_json(employeeList) FROM (SELECT email, firstname, lastname, fullname FROM employees) as employeeList
    ) TO '/tmp/employeeList.json' WITH (FORMAT text, HEADER false);

COPY (
SELECT row_to_json(projectList) FROM (SELECT customer_name, project_name, agreement_ref, active FROM projects) as projectList
    ) TO '/tmp/projectList.json' WITH (FORMAT text, HEADER false);

COPY (
SELECT row_to_json(transactionList) FROM (SELECT email, time, amount, description FROM transactions) as transactionList
    ) TO '/tmp/transactionList.json' WITH (FORMAT text, HEADER false);