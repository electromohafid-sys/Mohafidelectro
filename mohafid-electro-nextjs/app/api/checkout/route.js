import { NextResponse } from 'next/server';
import { getProducts, getCustomers, saveCustomers, getOrders, saveOrders } from '@/lib/data';
import { makeSalt, hashCustomerPassword, signCustomerToken, CUSTOMER_SESSION_COOKIE } from '@/lib/auth';

export async function POST(request) {
  const body = await request.json();
  const { productId, name, contact, password, address } = body;

  if (!productId || !name || !contact || !password || !address) {
    return NextResponse.json({ error: 'كل الحقول مطلوبة' }, { status: 400 });
  }

  const products = getProducts();
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: 'المنتج غير موجود' }, { status: 404 });
  }

  const customers = getCustomers();
  let customer = customers.find((c) => c.contact === contact.trim());

  if (customer) {
    const hash = hashCustomerPassword(password, customer.salt);
    if (hash !== customer.passwordHash) {
      return NextResponse.json({ error: 'كلمة المرور غير صحيحة لهذا الرقم/الإيميل' }, { status: 401 });
    }
  } else {
    const salt = makeSalt();
    customer = {
      id: 'c' + Date.now(),
      contact: contact.trim(),
      name: name.trim(),
      salt,
      passwordHash: hashCustomerPassword(password, salt),
      createdAt: new Date().toISOString()
    };
    customers.push(customer);
    saveCustomers(customers);
  }

  const orders = getOrders();
  const order = {
    id: 'o' + Date.now(),
    customerId: customer.id,
    productId: product.id,
    productName: product.name,
    price: product.price,
    address: address.trim(),
    paymentMethod: 'cod',
    status: 'placed',
    trackingSteps: [{ status: 'placed', date: new Date().toISOString() }],
    date: new Date().toISOString().slice(0, 10)
  };
  orders.push(order);
  saveOrders(orders);

  const res = NextResponse.json({ ok: true, orderId: order.id });
  res.cookies.set(CUSTOMER_SESSION_COOKIE, signCustomerToken(customer.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 90
  });
  return res;
}
