'use client';

import * as React from 'react';
// import type { Metadata } from 'next';
import Grid from '@mui/material/Grid2';

import Link from '@mui/material/Link';
// import { config } from '@/config';
import { Representantes } from '@/components/dashboard/overview/representantes';
import { Empresas } from '@/components/dashboard/overview/empresas';
import { Programacao } from '@/components/dashboard/overview/programacao';
import { Usuarios } from "@/components/dashboard/overview/usuarios";
import { Palestrantes } from "@/components/dashboard/overview/palestrantes";
import { Eventos } from "@/components/dashboard/overview/eventos";
import {Estandes} from "@/components/dashboard/overview/estandes";
import {TotalProfit} from "@/components/dashboard/overview/total-profit";
import {Sales} from "@/components/dashboard/overview/sales";
import {Traffic} from "@/components/dashboard/overview/traffic";
// import {LatestProducts} from "@/components/dashboard/overview/latest-products";
import dayjs from "dayjs";
// import {LatestOrders} from "@/components/dashboard/overview/latest-orders";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import { useContext } from 'react';
import { UserContext } from '@/contexts/user-context';

//export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [dataValues, setDataValues] = useState({
    usuarios: 0,
    palestrantes: 0,
    representantes: 0,
    eventos: 0,
    empresas: 0,
    estandes: 0,
    programacao: 0,
  });

  const [categories, setCategories] = useState<string[]>([]);

  const fetchData = async () => {
    const rawDates = [
      '2024-10-21',
      '2024-10-22',
      '2024-10-23',
      '2024-10-24',
      '2024-10-25',
      '2024-10-26',
      '2024-10-27'
    ];

    const formattedDates = rawDates.map(date => dayjs(date).format('DD/MM/YYYY'));

    const dataResponse = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          usuarios: 30,
          palestrantes: 49,
          representantes: 100,
          eventos: 43,
          empresas: 77,
          estandes: 20,
          programacao: 56,
        });
      }, 1000);
    });

    setCategories(formattedDates);
    setDataValues(dataResponse as typeof dataValues);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userContext = useContext(UserContext);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid size={12} sx={{ paddingBottom: '1rem'}}>
        <Typography fontSize={24} color="textSecondary">Seja bem vindo(a), {userContext?.user?.name}</Typography>
      </Grid>
      <Grid size={3}>
        <Link href="/dashboard/usuarios" style={{ textDecoration: 'none', height: '100%' }}>
          <Usuarios diff={12} trend="up" sx={{ height: '100%' }} value={dataValues.usuarios.toString()} />
        </Link>
      </Grid>
      <Grid size={3}>
        <Link href="/dashboard/palestrantes" style={{ textDecoration: 'none', height: '100%' }}>
          <Palestrantes diff={12} trend="up" sx={{ height: '100%' }} value={dataValues.palestrantes.toString()} />
        </Link>
      </Grid>
      <Grid size={3}>
        <Link href="/dashboard/representantes" style={{ textDecoration: 'none', height: '100%' }}>
          <Representantes diff={12} trend="up" sx={{ height: '100%' }} value={dataValues.representantes.toString()} />
        </Link>
      </Grid>
      <Grid size={3}>
        <Link href="/dashboard/eventos" style={{ textDecoration: 'none', height: '100%' }}>
          <Eventos sx={{ height: '100%' }} value={dataValues.eventos.toString()} />
        </Link>
      </Grid>
      <Grid size={3}>
        <Link href="/dashboard/empresas" style={{ textDecoration: 'none', height: '100%' }}>
          <Empresas sx={{ height: '100%' }} value={dataValues.empresas.toString()} />
        </Link>
      </Grid>
      <Grid size={3}>
        <Link href="/dashboard/estandes" style={{ textDecoration: 'none', height: '100%' }}>
          <Estandes sx={{ height: '100%' }} value={dataValues.estandes.toString()} />
        </Link>
      </Grid>
      <Grid size={3}>
        <Link href="/dashboard/programacao" style={{ textDecoration: 'none', height: '100%' }}>
          <Programacao diff={16} trend="down" sx={{ height: '100%' }} value={dataValues.programacao.toString()} />
        </Link>
      </Grid>
      <Grid size={3}>
        <TotalProfit sx={{ height: '100%' }} text={"Total cadastrado"} value="200" />
      </Grid>
      <Grid size={6}>
        <Sales
          title={"Leituras por dia"}
          chartSeries={[
            { name: 'This year', data: [
                dataValues.usuarios,
                dataValues.palestrantes,
                dataValues.representantes,
                dataValues.eventos,
                dataValues.empresas,
                dataValues.estandes,
                dataValues.programacao
              ]
            },
          ]}
          xaxisCategories={categories}
          sx={{ height: '100%' }}
          onRefresh={fetchData}
        />
      </Grid>
      <Grid size={6}>
        <Traffic title={"Empresas cadastradas"} chartSeries={[63, 15, 12, 10]} labels={['Empresa 1', 'Empresa 2', 'Empresa 3', 'Empresa 4']} sx={{ height: '100%' }} />
      </Grid>
      {/*<Grid lg={4} md={6} xs={12}>*/}
      {/*  <LatestProducts*/}
      {/*    products={[*/}
      {/*      {*/}
      {/*        id: 'PRD-005',*/}
      {/*        name: 'Soja & Co. Eucalyptus',*/}
      {/*        image: '/assets/product-5.png',*/}
      {/*        updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'PRD-004',*/}
      {/*        name: 'Necessaire Body Lotion',*/}
      {/*        image: '/assets/product-4.png',*/}
      {/*        updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'PRD-003',*/}
      {/*        name: 'Ritual of Sakura',*/}
      {/*        image: '/assets/product-3.png',*/}
      {/*        updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'PRD-002',*/}
      {/*        name: 'Lancome Rouge',*/}
      {/*        image: '/assets/product-2.png',*/}
      {/*        updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'PRD-001',*/}
      {/*        name: 'Erbology Aloe Vera',*/}
      {/*        image: '/assets/product-1.png',*/}
      {/*        updatedAt: dayjs().subtract(10, 'minutes').toDate(),*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*    sx={{ height: '100%' }}*/}
      {/*  />*/}
      {/*</Grid>*/}
      {/*<Grid size={6}>*/}
      {/*  <LatestOrders*/}
      {/*    orders={[*/}
      {/*      {*/}
      {/*        id: 'ORD-007',*/}
      {/*        customer: { name: 'Ekaterina Tankova' },*/}
      {/*        amount: 30.5,*/}
      {/*        status: 'pending',*/}
      {/*        createdAt: dayjs().subtract(10, 'minutes').toDate(),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'ORD-006',*/}
      {/*        customer: { name: 'Cao Yu' },*/}
      {/*        amount: 25.1,*/}
      {/*        status: 'delivered',*/}
      {/*        createdAt: dayjs().subtract(10, 'minutes').toDate(),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'ORD-004',*/}
      {/*        customer: { name: 'Alexa Richardson' },*/}
      {/*        amount: 10.99,*/}
      {/*        status: 'refunded',*/}
      {/*        createdAt: dayjs().subtract(10, 'minutes').toDate(),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'ORD-003',*/}
      {/*        customer: { name: 'Anje Keizer' },*/}
      {/*        amount: 96.43,*/}
      {/*        status: 'pending',*/}
      {/*        createdAt: dayjs().subtract(10, 'minutes').toDate(),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'ORD-002',*/}
      {/*        customer: { name: 'Clarke Gillebert' },*/}
      {/*        amount: 32.54,*/}
      {/*        status: 'delivered',*/}
      {/*        createdAt: dayjs().subtract(10, 'minutes').toDate(),*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'ORD-001',*/}
      {/*        customer: { name: 'Adam Denisov' },*/}
      {/*        amount: 16.76,*/}
      {/*        status: 'delivered',*/}
      {/*        createdAt: dayjs().subtract(10, 'minutes').toDate(),*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*    sx={{ height: '100%' }}*/}
      {/*  />*/}
      {/*</Grid>*/}
    </Grid>
  );
}
