import assert from 'assert';

const DATA = Symbol('apiresult');
const TABLENAME = Symbol('tablename');
const ROWS = Symbol('rows');

class ResultSetApi {
/*
PhpApiResultSet wrapper
*/

  constructor(phpApiResultSet) {
    this[DATA] = phpApiResultSet;
    this[TABLENAME] = this.tableNames[0];
  }

  set table(tableName) {
    assert(~this.tableNames.indexOf(tableName));
    if (tablename !== this[TABLENAME]) {
      // Reset table-specific data
      this[ROWS] = undefined;
    }

    this[TABLENAME] = tableName
  }

  get activeTable() {
    return this[TABLENAME];
  }

  get tableNames() {
    return Object.keys(this[DATA])
  }

  get columns() {
    return this[DATA][this[TABLENAME]].columns;
  }

  get rows() {
    if (!this[ROWS]) {
      this[ROWS] = this[DATA][this[TABLENAME]].records.map(row => {
        return this.columns.reduce((acc, cur, colIdx) => {
          acc[cur] = row[colIdx];
          return acc;
        }, {});
      });
    }
    return this[ROWS];
  }

}

export const makeApi = (phpApiXhrResult) => new ResultSetApi(phpApiXhrResult.data);
