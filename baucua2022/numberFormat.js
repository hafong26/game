function numberFormat(number) {
    let fmt = new Intl.NumberFormat();
    return fmt.format(number)
}