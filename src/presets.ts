import { TranslationProject } from './types';

export const PRESET_PROJECTS: TranslationProject[] = [
  {
    id: 'duplicar-numero',
    name: 'Duplicar Número (Básico)',
    pythonCode: `def duplicar(n):\n    return n * 2`,
    javaCode: `public class Calculos {\n    public int duplicar(int n) {\n        return n * 2;\n    }\n}`,
    explanation: 'Se sustituyó la declaración dinámica de Python `def duplicar(n):` por una firma estática en Java `public int duplicar(int n)`. El compilador de Java requiere definiciones de clase explícitas y firmas de métodos tipados para asegurar el rendimiento en tiempo de ejecución.',
    bleuScore: 38.2,
    compileRate: 96,
    acceptanceRate: 88,
    compilerSuccess: true,
    compilationDetails: 'Compile Success: class Calculos compiled in 12ms. Zero warnings.',
    datasets: [
      { name: 'CodeXGLUE', icon: 'check' },
      { name: 'XLCoST', icon: 'share' },
      { name: 'RosettaCode', icon: 'nodes' }
    ],
    lastUpdated: '2026-05-29'
  },
  {
    id: 'sumar-lista',
    name: 'Sumar Lista de Enteros',
    pythonCode: `def sumar_lista(numeros):\n    suma = 0\n    for x in numeros:\n        suma += x\n    return suma`,
    javaCode: `import java.util.List;\n\npublic class Calculos {\n    public int sumarLista(List<Integer> numeros) {\n        int suma = 0;\n        for (int x : numeros) {\n            suma += x;\n        }\n        return suma;\n    }\n}`,
    explanation: 'Se tradujo el bucle `for x in numeros:` a un bucle for-each tradicional de Java `for (int x : numeros)`. Adicionalmente, el tipo general dinámico de Python se especializa en un tipo genérico `List<Integer>` parametrizado para asegurar el tipado fuerte y la robustez.',
    bleuScore: 45.6,
    compileRate: 100,
    acceptanceRate: 92,
    compilerSuccess: true,
    compilationDetails: 'Compile Success: class Calculos with imported java.util.List compiled in 18ms.',
    datasets: [
      { name: 'CodeXGLUE', icon: 'check' },
      { name: 'XLCoST', icon: 'share' },
      { name: 'RosettaCode', icon: 'nodes' }
    ],
    lastUpdated: '2026-05-29'
  },
  {
    id: 'filtrar-pares',
    name: 'Filtrar Números Pares',
    pythonCode: `def filtrar_pares(lista):\n    return [x for x in lista if x % 2 == 0]`,
    javaCode: `import java.util.List;\nimport java.util.ArrayList;\n\npublic class Filtro {\n    public List<Integer> filtrarPares(List<Integer> lista) {\n        List<Integer> pares = new ArrayList<>();\n        for (int x : lista) {\n            if (x % 2 == 0) {\n                pares.add(x);\n            }\n        }\n        return pares;\n    }\n}`,
    explanation: 'Se sustituyó la lista por comprensión de Python por un bucle for-each en Java debido al tipado estático y la falta de azúcar sintáctico nativa para comprensiones tradicionales en Java. El compilador requiere inicializaciones de clase explícitas como `ArrayList<Integer>` para albergar dinámicamente los elementos.',
    bleuScore: 39.8,
    compileRate: 98,
    acceptanceRate: 90,
    compilerSuccess: true,
    compilationDetails: 'Compile Success: class Filtro compiled in 22ms. ArrayList instantiated correctly.',
    datasets: [
      { name: 'CodeXGLUE', icon: 'check' },
      { name: 'XLCoST', icon: 'share' },
      { name: 'RosettaCode', icon: 'nodes' }
    ],
    lastUpdated: '2026-05-29'
  },
  {
    id: 'encontrar-maximo',
    name: 'Encontrar Máximo Valor',
    pythonCode: `def encontrar_maximo(valores):\n    if not valores:\n        return None\n    max_val = valores[0]\n    for v in valores:\n        if v > max_val:\n            max_val = v\n    return max_val`,
    javaCode: `import java.util.List;\n\npublic class Busqueda {\n    public Integer encontrarMaximo(List<Integer> valores) {\n        if (valores == null || valores.isEmpty()) {\n            return null;\n        }\n        int maxVal = valores.get(0);\n        for (int v : valores) {\n            if (v > maxVal) {\n                maxVal = v;\n            }\n        }\n        return maxVal;\n    }\n}`,
    explanation: 'En Java, las comprobaciones de nulo y vacío se realizan explícitamente (`valores == null || valores.isEmpty()`). Además, el vector indexable `valores[0]` se traduce a la llamada orientada a objetos de colección `.get(0)`. El tipo de retorno es `Integer` para permitir el valor nulo.',
    bleuScore: 41.2,
    compileRate: 95,
    acceptanceRate: 85,
    compilerSuccess: true,
    compilationDetails: 'Compile Success: class Busqueda compiled in 16ms.',
    datasets: [
      { name: 'CodeXGLUE', icon: 'check' },
      { name: 'XLCoST', icon: 'share' },
      { name: 'RosettaCode', icon: 'nodes' }
    ],
    lastUpdated: '2026-05-29'
  }
];
